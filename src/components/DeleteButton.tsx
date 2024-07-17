import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import ModalForm from "./form/ModalForm";

type DeleteButtonProps = {
  title: string,
  description: string,
  action: (formData: FormData) => void,
  confirmText: string,
  cancelText: string,
  disabled?: boolean,
};

const DeleteButton = ({
  title,
  description,
  action,
  confirmText,
  cancelText,
  disabled = false,
}: DeleteButtonProps) => (
  <ModalForm
    buttonIcon={faTrashCan}
    buttonSize="sm"
    buttonVariant="outline-danger"
    disabled={disabled}
    title={title}
    action={action}
    confirmVariant="danger"
    confirmText={confirmText}
    cancelText={cancelText}
  >
    {description}
  </ModalForm>
);

export default DeleteButton;
