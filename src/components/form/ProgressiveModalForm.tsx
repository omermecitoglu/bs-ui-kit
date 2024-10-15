"use client";
import { type ReactNode, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ActionButton from "../ActionButton";
import ProgressiveForm from "./ProgressiveForm";
import SubmitButton from "./SubmitButton";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ButtonVariant } from "react-bootstrap/types";

type ProgressiveModalFormProps = {
  buttonVariant?: ButtonVariant,
  buttonStretched?: boolean,
  buttonSize?: "lg" | "sm",
  buttonIcon?: IconProp,
  buttonText?: string,
  disabled?: boolean,
  title: string,
  action: (_: unknown, formData: FormData) => Promise<Record<string, string>>,
  messages?: Record<string, string | undefined>,
  confirmVariant?: ButtonVariant,
  confirmText: string,
  cancelText: string,
  onSuccess?: () => void,
  children: ReactNode,
};

const ProgressiveModalForm = ({
  buttonVariant = "primary",
  buttonStretched = false,
  buttonSize,
  buttonIcon,
  buttonText,
  disabled = false,
  title,
  action,
  messages,
  confirmVariant = "primary",
  confirmText,
  cancelText,
  onSuccess,
  children,
}: ProgressiveModalFormProps) => {
  const [open, setOpen] = useState(false);
  const handleFormStateChange = (newState: Record<string, string>) => {
    if (onSuccess && Object.keys(newState).includes("[success]")) {
      setOpen(false);
      onSuccess();
    }
  };
  return (
    <>
      {buttonIcon ? (
        <ActionButton
          icon={buttonIcon}
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
      <Modal show={open} backdrop="static" onHide={() => setOpen(false)}>
        <ProgressiveForm action={action} messages={messages} noGap onStateChange={handleFormStateChange}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column gap-3">
            {children}
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton variant={confirmVariant} text={confirmText} />
            <ActionButton
              variant="secondary"
              text={cancelText}
              onClick={() => setOpen(false)}
            />
          </Modal.Footer>
        </ProgressiveForm>
      </Modal>
    </>
  );
};

export default ProgressiveModalForm;
