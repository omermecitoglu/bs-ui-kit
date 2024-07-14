"use client";
import { type ReactNode, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ActionButton from "../ActionButton";
import StatusEmitter from "./StatusEmitter";
import SubmitButton from "./SubmitButton";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ButtonVariant } from "react-bootstrap/types";

type ModalFormProps = {
  buttonVariant?: ButtonVariant,
  buttonStretched?: boolean,
  buttonSize?: "lg" | "sm",
  buttonIcon?: IconProp,
  buttonText?: string,
  disabled?: boolean,
  title: string,
  action: (formData: FormData) => void,
  confirmVariant?: ButtonVariant,
  confirmText: string,
  cancelText: string,
  children: ReactNode,
};

const ModalForm = ({
  buttonVariant = "primary",
  buttonStretched = false,
  buttonSize,
  buttonIcon,
  buttonText,
  disabled = false,
  title,
  action,
  confirmVariant = "primary",
  confirmText,
  cancelText,
  children,
}: ModalFormProps) => {
  const [open, setOpen] = useState(false);
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
        <Form action={action as unknown as string}>
          <StatusEmitter onComplete={() => setOpen(false)} />
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
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
