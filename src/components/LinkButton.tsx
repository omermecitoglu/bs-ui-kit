import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import ActionButton from "./ActionButton";
import type { LinkProps } from "../types/link";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ButtonVariant } from "react-bootstrap/types";

type LinkButtonProps = {
  as: (props: LinkProps) => JSX.Element,
  variant?: ButtonVariant,
  size?: "lg" | "sm",
  icon?: IconProp,
  href: string,
  text?: string,
  disabled?: boolean,
  stretched?: boolean,
};

const LinkButton = ({
  as: Link,
  variant = "primary",
  size,
  icon,
  href,
  text,
  disabled = false,
  stretched = false,
}: LinkButtonProps) => (
  disabled ? (
    <ActionButton
      variant={variant}
      size={size}
      icon={icon}
      text={text}
      disabled={disabled}
      stretched={stretched}
    />
  ) : (
    <Link
      href={href}
      className={classNames("btn", `btn-${variant}`, {
        "btn-sm": size === "sm",
        "btn-lg": size === "lg",
      })}
    >
      {icon && (
        <FontAwesomeIcon size="lg" icon={icon} className="fa-fw" />
      )}
      {text && (
        <span className={icon ? classNames("ms-2", stretched ? "me-4" : "me-2") : undefined}>
          {text}
        </span>
      )}
    </Link>
  )
);

export default LinkButton;
