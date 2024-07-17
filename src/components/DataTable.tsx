import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import classNames from "classnames";
import Table from "react-bootstrap/Table";
import styles from "../styles/data-table.module.scss";
import DeleteButton from "./DeleteButton";
import LinkButton from "./LinkButton";
import LongColumn from "./LongColumn";
import type { ReactNode } from "react";

type Column<T, Value extends keyof T, PK extends keyof T> = {
  header: string,
  size?: "sm" | "md",
  wrapper?: (value: T[Value], primaryKey?: T[PK]) => ReactNode,
  long?: boolean,
};

type DataTableProps<T, K extends keyof T, PK extends keyof T> = {
  link: (props: { href: string, className: string, children: ReactNode }) => JSX.Element,
  collection: T[],
  primaryKey: PK,
  schema: Record<K, Column<T, K, PK>>,
  editLink?: (primaryKey: T[PK]) => string,
} & ({
  destroyAction: (primaryKey: T[PK], formData: FormData) => void,
  destroyWarningTitle: string,
  destroyWarningDescription: string,
  destroyConfirmText: string,
  destroyCancelText: string,
} | {
  destroyAction?: undefined,
  destroyWarningTitle?: undefined,
  destroyWarningDescription?: undefined,
  destroyConfirmText?: undefined,
  destroyCancelText?: undefined,
});

const DataTable = <T extends Record<string, string | number>, K extends keyof T, PK extends keyof T>({
  link: Link,
  collection,
  primaryKey,
  editLink,
  destroyAction,
  destroyWarningTitle,
  destroyWarningDescription,
  destroyConfirmText,
  destroyCancelText,
  schema,
}: DataTableProps<T, K, PK>) => {
  function cutText<TextType>(text: TextType, length: number) {
    if (typeof text === "string") {
      return `${text.slice(0, length)}${text.length > length ? "..." : ""}` as TextType;
    }
    return text;
  }
  return (
    <Table striped hover className={styles.table}>
      <thead className="text-nowrap">
        <tr>
          {Object.entries<Column<T, K, PK>>(schema).map(([key, column]) => (
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
        {collection.map(collectionItem => (
          <tr key={collectionItem[primaryKey]}>
            {Object.entries<Column<T, K, PK>>(schema).map(([key, column]) => (
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
                  ? column.wrapper(cutText(collectionItem[key as K], 120), collectionItem[primaryKey])
                  : cutText(collectionItem[key], 120)}
              </LongColumn>
            ))}
            <td className={styles.actions}>
              <div className="d-flex justify-content-end gap-2">
                {editLink && (
                  <LinkButton
                    as={Link}
                    variant="outline-secondary"
                    icon={faPencil}
                    href={editLink(collectionItem[primaryKey])}
                    size="sm"
                  />
                )}
                {destroyAction && (
                  <DeleteButton
                    title={destroyWarningTitle}
                    description={destroyWarningDescription}
                    action={destroyAction.bind(null, collectionItem[primaryKey])}
                    confirmText={destroyConfirmText}
                    cancelText={destroyCancelText}
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
