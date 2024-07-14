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
  stretched?: boolean,
};

const SubmitButton = ({
  icon = faCheck,
  text,
  variant = "primary",
  stretched = false,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <ActionButton
      type="submit"
      icon={icon}
      text={text}
      variant={variant}
      spinning={pending}
      stretched={stretched}
    />
  );
};

export default SubmitButton;
