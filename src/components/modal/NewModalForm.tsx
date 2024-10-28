import Modal from "react-bootstrap/Modal";
import ActionButton from "../ActionButton";
import ProgressiveForm from "../form/ProgressiveForm";
import SubmitButton from "../form/SubmitButton";
import type { ReactNode } from "react";
import type { ButtonVariant } from "react-bootstrap/types";

type NewModalFormProps = {
  open: boolean,
  title: string,
  action: (_: unknown, formData: FormData) => Promise<Record<string, string>>,
  messages?: Record<string, string | undefined>,
  confirmButtonVariant?: ButtonVariant,
  confirmButtonText: string,
  cancelButtonText: string,
  onSuccess?: () => void,
  onHide: () => void,
  children: ReactNode,
};

const NewModalForm = ({
  open,
  title,
  action,
  messages,
  confirmButtonVariant = "primary",
  confirmButtonText,
  cancelButtonText,
  onSuccess,
  onHide,
  children,
}: NewModalFormProps) => {
  const handleFormStateChange = (newState: Record<string, string>) => {
    if (onSuccess && Object.keys(newState).includes("[success]")) {
      onHide();
      onSuccess();
    }
  };
  return (
    <Modal show={open} backdrop="static" onHide={onHide}>
      <ProgressiveForm action={action} messages={messages} noGap onStateChange={handleFormStateChange}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          {children}
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton variant={confirmButtonVariant} text={confirmButtonText} />
          <ActionButton
            variant="secondary"
            text={cancelButtonText}
            onClick={onHide}
          />
        </Modal.Footer>
      </ProgressiveForm>
    </Modal>
  );
};

export default NewModalForm;
