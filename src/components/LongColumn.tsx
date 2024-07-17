import classNames from "classnames";
import styles from "../styles/ellipsis.module.css";
import type { ReactNode } from "react";

type LongColumnProps = {
  className: string,
  disabled?: boolean,
  children: ReactNode,
};

const LongColumn = ({
  className,
  disabled = false,
  children,
}: LongColumnProps) => (
  <td className={classNames(!disabled && styles.ellipsis, className)}>
    {disabled ? children : (
      <div><span>{children}</span></div>
    )}
  </td>
);

export default LongColumn;
