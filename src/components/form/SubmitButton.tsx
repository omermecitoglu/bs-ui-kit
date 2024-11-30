"use client";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { useFormStatus } from "react-dom";
import ActionButton from "../ActionButton";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ButtonVariant } from "react-bootstrap/types";

type SubmitButtonProps = {
  /**
   * Font awesome icon that will appear in the button (defaults to check icon)
   */
  icon?: IconProp,
  /**
   * The text will appear in the button
   */
  text?: string,
  /**
   * Color of the button
   */
  variant?: ButtonVariant,
  /**
   * Size of the button
   */
  size?: "sm" | "lg",
  /**
   * Is the button wide?
   */
  stretched?: boolean,
  /**
   * Additional css class names
   */
  className?: string,
};

/**
 * Same as ActionButton but provides pending status via useFormStatus
 */
const SubmitButton = ({
  icon = faCheck,
  text,
  variant = "primary",
  size,
  stretched = false,
  className,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <ActionButton
      type="submit"
      icon={icon}
      text={text}
      variant={variant}
      size={size}
      spinning={pending}
      stretched={stretched}
      className={className}
    />
  );
};

export default SubmitButton;
