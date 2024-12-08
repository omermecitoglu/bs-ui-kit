import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import ActionButton from "./ActionButton";
import type { LinkProps } from "../types/link";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ReactNode } from "react";
import type { ButtonVariant } from "react-bootstrap/types";

type LinkButtonProps = {
  as: (props: LinkProps) => ReactNode,
  variant?: ButtonVariant,
  size?: "lg" | "sm",
  icon?: IconProp,
  iconFlip?: "horizontal" | "vertical" | "both",
  href: string,
  text?: string,
  disabled?: boolean,
  stretched?: boolean,
  className?: string,
};

const LinkButton = ({
  as: Link,
  variant = "primary",
  size,
  icon,
  iconFlip,
  href,
  text,
  disabled = false,
  stretched = false,
  className,
}: LinkButtonProps) => (
  disabled ? (
    <ActionButton
      variant={variant}
      size={size}
      icon={icon}
      iconFlip={iconFlip}
      text={text}
      disabled={disabled}
      stretched={stretched}
      className={className}
    />
  ) : (
    <Link
      href={href}
      className={classNames(className, "btn", `btn-${variant}`, {
        "btn-sm": size === "sm",
        "btn-lg": size === "lg",
      })}
    >
      {icon && (
        <FontAwesomeIcon
          size="lg"
          icon={icon}
          className={classNames("fa-fw", {
            "fa-flip-horizontal": iconFlip === "horizontal",
            "fa-flip-vertical": iconFlip === "vertical",
            "fa-flip-both": iconFlip === "both",
          })}
        />
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
