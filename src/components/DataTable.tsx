import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import classNames from "classnames";
import Table from "react-bootstrap/Table";
import styles from "../styles/data-table.module.scss";
import DeleteButton from "./DeleteButton";
import LinkButton from "./LinkButton";
import LongColumn from "./LongColumn";
import type { ReactNode } from "react";

type Column<CI, K extends keyof CI, PK extends keyof CI> = {
  header: string,
  size?: "sm" | "md",
  wrapper?: (value: CI[K], primaryKey: CI[PK], item: CI) => ReactNode,
  long?: boolean,
};

export type DataTableProps<CI, K extends keyof CI, PK extends keyof CI> = {
  link: (props: { href: string, className: string, children: ReactNode }) => JSX.Element,
  collection: CI[],
  primaryKey: PK,
  schema: {
    [CIK in K]: Column<CI, CIK, PK>;
  },
  editLink?: (primaryKey: CI[PK]) => string,
} & ({
  destroyAction: (primaryKey: CI[PK], formData: FormData) => void,
  destroyWarningTitle: string,
  destroyWarningDescription: string,
  destroyConfirmText: string,
  destroyCancelText: string,
  destroyDisabled: boolean | ((primaryKey: CI[PK]) => boolean),
} | {
  destroyAction?: undefined,
  destroyWarningTitle?: undefined,
  destroyWarningDescription?: undefined,
  destroyConfirmText?: undefined,
  destroyCancelText?: undefined,
  destroyDisabled?: undefined,
});

const DataTable = <CI extends Record<string, unknown>, K extends keyof CI, PK extends keyof CI>({
  link: Link,
  collection,
  primaryKey,
  schema,
  editLink,
  destroyAction,
  destroyWarningTitle,
  destroyWarningDescription,
  destroyConfirmText,
  destroyCancelText,
  destroyDisabled = false,
}: DataTableProps<CI, K, PK>) => {
  function cutText(text: unknown, length: number): string {
    if (typeof text === "string") {
      return `${text.slice(0, length)}${text.length > length ? "..." : ""}`;
    }
    return text as string;
  }
  return (
    <Table striped hover className={styles.table}>
      <thead className="text-nowrap">
        <tr>
          {Object.entries<Column<CI, K, PK>>(schema as unknown as ArrayLike<Column<CI, K, PK>>).map(([key, column]) => (
            <th
              key={key}
              className={classNames({
                "d-none": !!column.size,
                "d-sm-table-cell": column.size === "sm",
                "d-md-table-cell": column.size === "md",
              })}
            >
              {column.header}
            </th>
          ))}
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody className="text-nowrap">
        {collection.map(item => (
          <tr key={item[primaryKey] as string}>
            {Object.entries<Column<CI, K, PK>>(schema as unknown as ArrayLike<Column<CI, K, PK>>).map(([key, column]) => (
              <LongColumn
                key={key}
                className={classNames({
                  "d-none": !!column.size,
                  "d-sm-table-cell": column.size === "sm",
                  "d-md-table-cell": column.size === "md",
                })}
                disabled={!column.long}
              >
                {column.wrapper
                  ? column.wrapper(
                    cutText(item[key], 120) as CI[K],
                    item[primaryKey],
                    item,
                  )
                  : cutText(item[key], 120)}
              </LongColumn>
            ))}
            <td className={styles.actions}>
              <div className="d-flex justify-content-end gap-2">
                {editLink && (
                  <LinkButton
                    as={Link}
                    variant="outline-secondary"
                    icon={faPencil}
                    href={editLink(item[primaryKey])}
                    size="sm"
                  />
                )}
                {destroyAction && (
                  <DeleteButton
                    title={destroyWarningTitle}
                    description={destroyWarningDescription}
                    action={destroyAction.bind(null, item[primaryKey])}
                    confirmText={destroyConfirmText}
                    cancelText={destroyCancelText}
                    disabled={typeof destroyDisabled === "function" ? destroyDisabled(item[primaryKey]) : destroyDisabled}
                  />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
