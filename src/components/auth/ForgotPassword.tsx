import Input from "../form/Input";
import ProgressiveForm from "../form/ProgressiveForm";
import SubmitButton from "../form/SubmitButton";
import type { ReactNode } from "react";

type ForgotPasswordProps = {
  title: string,
  action: (_: unknown, formData: FormData) => Promise<Record<string, string>>,
  usernameLabel: string,
  usernameKey: string,
  submitText: string,
  loginSuggestion: ReactNode,
  commonExceptions?: Record<string, string>,
  emailExceptions?: Record<string, string>,
};

const ForgotPassword = ({
  title,
  action,
  usernameLabel,
  usernameKey,
  submitText,
  loginSuggestion,
  commonExceptions,
  emailExceptions,
}: ForgotPasswordProps) => (
  <>
    <h1 className="fs-4 card-title fw-bold mb-4">{title}</h1>
    <ProgressiveForm action={action} messages={commonExceptions} hideAfterPost>
      <Input
        label={usernameLabel}
        type="email"
        name={usernameKey}
        autoComplete="username"
        placeholder="name@example.com"
        messages={emailExceptions}
        required
        autoFocus
      />
      <div className="d-flex flex-row-reverse justify-content-between align-items-center">
        <SubmitButton text={submitText} />
      </div>
    </ProgressiveForm>
    <div className="mt-4 mb-2 form-text text-center">
      {loginSuggestion}
    </div>
  </>
);

export default ForgotPassword;
