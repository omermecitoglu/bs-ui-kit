"use client";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { useFormStatus } from "react-dom";
import ActionButton from "../ActionButton";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ButtonVariant } from "react-bootstrap/types";

type SubmitButtonProps = {
  icon?: IconProp,
  text: string,
  variant?: ButtonVariant,
  size?: "sm" | "lg",
  stretched?: boolean,
  className?: string,
};

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
