import classNames from "classnames";
import Table from "react-bootstrap/Table";
import { pluck } from "../utils/object";
import LongColumn from "./LongColumn";
import type { ReactNode } from "react";

type Line<S, K extends keyof S, PK extends keyof S> = {
  header: string,
  wrapper?: (value: S[K], primaryKey: S[PK], source: S) => ReactNode,
  long?: boolean,
};

type InfoTableProps<S, K extends keyof S, PK extends keyof S> = {
  source: S,
  primaryKey: PK,
  schema: {
    [SK in K]: Line<S, SK, PK>;
  },
};

const InfoTable = <S extends Record<string, unknown>, K extends keyof S, PK extends keyof S>({
  source,
  primaryKey,
  schema,
}: InfoTableProps<S, K, PK>) => {
  const renderContent = (content: unknown) => {
    switch (typeof content) {
      case "string":
      case "number":
        return content;
      case "bigint":
        return content.toString();
      case "function":
        return content.name;
      default:
        return JSON.stringify(content);
    }
  };

  return (
    <Table className="mb-0">
      <tbody
        className={classNames({
          "text-nowrap": pluck(Object.values(schema as ArrayLike<Line<S, K, PK>>), "long").includes(true),
        })}
      >
        {Object.entries(schema as ArrayLike<Line<S, K, PK>>).map(([key, line], index, entries) => (
          <tr key={key}>
            <th
              className={classNames("with-colon", {
                "pt-0": index === 0,
                "border-bottom-0 pb-0": index === entries.length - 1,
              })}
            >
              {line.header}
            </th>
            <LongColumn
              className={classNames({
                "pt-0": index === 0,
                "border-bottom-0 pb-0": index === entries.length - 1,
              })}
              disabled={!line.long}
            >
              {line.wrapper ? line.wrapper(source[key as K], source[primaryKey], source) : renderContent(source[key])}
            </LongColumn>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InfoTable;
