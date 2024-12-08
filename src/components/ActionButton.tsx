import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Button from "react-bootstrap/Button";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ButtonVariant } from "react-bootstrap/types";

type ActionButtonProps = {
  type?: "button" | "submit" | "reset",
  text?: string,
  icon?: IconProp,
  iconFlip?: "horizontal" | "vertical" | "both",
  variant?: ButtonVariant,
  size?: "sm" | "lg",
  onClick?: () => void,
  disabled?: boolean,
  spinning?: boolean,
  className?: string,
  stretched?: boolean,
};

const ActionButton = ({
  type = "button",
  text,
  icon,
  iconFlip,
  variant = "primary",
  size,
  onClick,
  disabled = false,
  spinning = false,
  className,
  stretched = false,
}: ActionButtonProps) => (
  <Button
    type={type}
    size={size}
    variant={variant}
    className={className}
    onClick={onClick}
    disabled={disabled || spinning}
  >
    {icon ? (
      <FontAwesomeIcon
        size="lg"
        icon={spinning ? faSpinner : icon}
        className={classNames("fa-fw", {
          "fa-spin": spinning,
          "fa-flip-horizontal": iconFlip === "horizontal",
          "fa-flip-vertical": iconFlip === "vertical",
          "fa-flip-both": iconFlip === "both",
        })}
      />
    ) : (
      spinning && <FontAwesomeIcon size="lg" icon={faSpinner} className="fa-fw fa-spin" />
    )}
    {text && (
      <span className={icon ? classNames("ms-2", stretched ? "me-4" : "me-2") : undefined}>
        {text}
      </span>
    )}
  </Button>
);

export default ActionButton;
