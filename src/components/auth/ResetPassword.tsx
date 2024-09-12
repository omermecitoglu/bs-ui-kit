import FormCheck from "react-bootstrap/FormCheck";
import Input from "../form/Input";
import ProgressiveForm from "../form/ProgressiveForm";
import SubmitButton from "../form/SubmitButton";

type ResetPasswordProps = {
  title: string,
  action: (_: unknown, formData: FormData) => Promise<Record<string, string>>,
  usernameLabel: string,
  usernameKey: string,
  usernameValue: string,
  newPasswordLabel: string,
  newPasswordKey: string,
  confirmPasswordLabel: string,
  confirmPasswordKey: string,
  submitText: string,
  hardResetLabel?: string,
  hardResetKey?: string,
  hardResetValue?: string,
  commonExceptions?: Record<string, string>,
  confirmationExceptions?: Record<string, string>,
};

const ResetPassword = ({
  title,
  action,
  usernameLabel,
  usernameKey,
  usernameValue,
  newPasswordLabel,
  newPasswordKey,
  confirmPasswordLabel,
  confirmPasswordKey,
  submitText,
  hardResetLabel,
  hardResetKey,
  hardResetValue = "yes",
  commonExceptions,
  confirmationExceptions,
}: ResetPasswordProps) => (
  <>
    <h1 className="fs-4 card-title fw-bold mb-4">{title}</h1>
    <ProgressiveForm action={action} messages={commonExceptions}>
      <Input
        label={usernameLabel}
        type="email"
        name={usernameKey}
        autoComplete="username"
        value={usernameValue}
        readOnly
      />
      <Input
        label={newPasswordLabel}
        type="password"
        name={newPasswordKey}
        autoComplete="new-password"
        required
        autoFocus
      />
      <Input
        label={confirmPasswordLabel}
        type="password"
        name={confirmPasswordKey}
        autoComplete="new-password"
        messages={confirmationExceptions}
        required
      />
      <div className="d-flex flex-row-reverse justify-content-between align-items-center mb-3">
        <SubmitButton text={submitText} />
        {(hardResetLabel && hardResetKey) ? (
          <FormCheck
            type="checkbox"
            id={hardResetKey}
            label={hardResetLabel}
            name={hardResetKey}
            value={hardResetValue}
          />
        ) : (
          <input type="hidden" name="hard-reset" value="no" />
        )}
      </div>
    </ProgressiveForm>
  </>
);

export default ResetPassword;
