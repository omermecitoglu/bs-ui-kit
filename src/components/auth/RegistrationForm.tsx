import Input from "../form/Input";
import ProgressiveForm from "../form/ProgressiveForm";
import SubmitButton from "../form/SubmitButton";
import type { ReactNode } from "react";

type RegistrationFormProps = {
  title: string,
  action: (_: unknown, formData: FormData) => Promise<Record<string, string>>,
  displayNameLabel: string,
  displayNameKey: string,
  usernameLabel: string,
  usernameKey: string,
  passwordLabel: string,
  passwordKey: string,
  submitText: string,
  terms: ReactNode,
  loginSuggestion: ReactNode,
  commonExceptions?: Record<string, string>,
  displayNameExceptions?: Record<string, string>,
  emailExceptions?: Record<string, string>,
};

const RegistrationForm = ({
  title,
  action,
  displayNameLabel,
  displayNameKey,
  usernameLabel,
  usernameKey,
  passwordLabel,
  passwordKey,
  submitText,
  terms,
  loginSuggestion,
  commonExceptions,
  displayNameExceptions,
  emailExceptions,
}: RegistrationFormProps) => (
  <>
    <h1 className="fs-4 card-title fw-bold mb-4">{title}</h1>
    <ProgressiveForm action={action} messages={commonExceptions}>
      <Input
        label={displayNameLabel}
        type="text"
        name={displayNameKey}
        autoComplete="name"
        messages={displayNameExceptions}
        required
        autoFocus
      />
      <Input
        label={usernameLabel}
        type="email"
        name={usernameKey}
        autoComplete="username"
        placeholder="name@example.com"
        messages={emailExceptions}
        required
      />
      <Input
        label={passwordLabel}
        type="password"
        name={passwordKey}
        autoComplete="new-password"
        required
      />
      <p className="form-text text-muted my-0">
        {terms}
      </p>
      <div className="d-flex flex-row-reverse justify-content-between align-items-center">
        <SubmitButton text={submitText} />
      </div>
    </ProgressiveForm>
    <div className="mt-4 mb-2 form-text text-center">
      {loginSuggestion}
    </div>
  </>
);

export default RegistrationForm;
