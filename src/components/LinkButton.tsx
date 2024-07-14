import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ReactNode } from "react";
import type { ButtonVariant } from "react-bootstrap/types";

type LinkButtonProps = {
  as: (props: { href: string, className: string, children: ReactNode }) => JSX.Element,
  variant?: ButtonVariant,
  size?: "lg" | "sm",
  icon: IconProp,
  href: string,
  text?: string,
};

const LinkButton = ({
  as: Link,
  variant = "primary",
  size,
  icon,
  href,
  text,
}: LinkButtonProps) => (
  <Link
    href={href}
    className={classNames("btn", `btn-${variant}`, {
      "btn-sm": size === "sm",
      "btn-lg": size === "lg",
    })}
  >
    <FontAwesomeIcon size="lg" icon={icon} className="fa-fw" />
    {text && (
      <span className="mx-2">{text}</span>
    )}
  </Link>
);

export default LinkButton;
