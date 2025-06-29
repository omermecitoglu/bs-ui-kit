import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import ProgressiveModalForm from "./form/ProgressiveModalForm";

type DeleteButtonProps = {
  title: string,
  description: string,
  action: (initialState: unknown, formData: FormData) => Promise<Record<string, string>>,
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
  <ProgressiveModalForm
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
  </ProgressiveModalForm>
);

export default DeleteButton;
