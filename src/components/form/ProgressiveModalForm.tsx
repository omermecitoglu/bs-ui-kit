"use client";
import { type ReactNode, useState } from "react";
import Button from "react-bootstrap/Button";
import ActionButton from "../ActionButton";
import NewModalForm from "../modal/NewModalForm";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ButtonVariant } from "react-bootstrap/types";

type ProgressiveModalFormProps = {
  customButton?: (onClick: () => void) => ReactNode,
  buttonVariant?: ButtonVariant,
  buttonStretched?: boolean,
  buttonSize?: "lg" | "sm",
  buttonIcon?: IconProp,
  buttonIconFlip?: "horizontal" | "vertical" | "both",
  buttonText?: string,
  disabled?: boolean,
  title: string,
  action: (_: unknown, formData: FormData) => Promise<Record<string, string>>,
  messages?: Record<string, string | undefined>,
  confirmVariant?: ButtonVariant,
  confirmText: string,
  cancelText: string,
  /**
   * Modal has a default behavior of enforcing focus in React Bootstrap, this prop can disable that
   */
  disableEnforcedFocus?: boolean,
  onSuccess?: () => void,
  children: ReactNode,
};

const ProgressiveModalForm = ({
  customButton,
  buttonVariant = "primary",
  buttonStretched = false,
  buttonSize,
  buttonIcon,
  buttonIconFlip,
  buttonText,
  disabled = false,
  title,
  action,
  messages,
  confirmVariant = "primary",
  confirmText,
  cancelText,
  disableEnforcedFocus = false,
  onSuccess,
  children,
}: ProgressiveModalFormProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {customButton ? customButton(() => setOpen(true)) : (
        <>
          {buttonIcon ? (
            <ActionButton
              icon={buttonIcon}
              iconFlip={buttonIconFlip}
              text={buttonText}
              variant={buttonVariant}
              size={buttonSize}
              onClick={() => setOpen(true)}
              disabled={disabled}
              stretched={buttonStretched}
            />
          ) : (
            <Button variant={buttonVariant} onClick={() => setOpen(true)}>
              {buttonText}
            </Button>
          )}
        </>
      )}
      <NewModalForm
        open={open}
        title={title}
        action={action}
        messages={messages}
        confirmButtonVariant={confirmVariant}
        confirmButtonText={confirmText}
        cancelButtonText={cancelText}
        disableEnforcedFocus={disableEnforcedFocus}
        onSuccess={onSuccess}
        onHide={() => setOpen(false)}
      >
        {children}
      </NewModalForm>
    </>
  );
};

export default ProgressiveModalForm;
