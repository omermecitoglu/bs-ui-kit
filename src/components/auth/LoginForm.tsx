import FormCheck from "react-bootstrap/FormCheck";
import Input from "../form/Input";
import ProgressiveForm from "../form/ProgressiveForm";
import SubmitButton from "../form/SubmitButton";
import type { LinkProps } from "../../types/link";
import type { ReactNode } from "react";

type LoginFormProps = {
  title: string,
  action: (_: unknown, formData: FormData) => Promise<Record<string, string>>,
  link: (props: LinkProps) => ReactNode,
  usernameLabel: string,
  usernameKey: string,
  passwordLabel: string,
  passwordKey: string,
  forgotPasswordURL?: string,
  forgotPasswordText?: string,
  submitText: string,
  rememberLabel?: string,
  rememberKey?: string,
  rememberValue?: string,
  registerSuggestion: ReactNode,
  externalLoginMethods?: ReactNode,
  loginExceptions?: Record<string, string>,
  emailExceptions?: Record<string, string>,
};

const LoginForm = ({
  title,
  action,
  link: Link,
  usernameLabel,
  usernameKey,
  passwordLabel,
  passwordKey,
  forgotPasswordURL,
  forgotPasswordText,
  submitText,
  rememberLabel,
  rememberKey,
  rememberValue = "yes",
  registerSuggestion,
  externalLoginMethods,
  loginExceptions,
  emailExceptions,
}: LoginFormProps) => (
  <>
    <h1 className="fs-4 card-title fw-bold mb-4">{title}</h1>
    <ProgressiveForm action={action} messages={loginExceptions}>
      <Input
        label={usernameLabel}
        type="email"
        name={usernameKey}
        autoComplete="username"
        placeholder="name@example.com"
        required
        messages={emailExceptions}
        autoFocus
      />
      <Input
        label={passwordLabel}
        type="password"
        name={passwordKey}
        autoComplete="current-password"
        required
      >
        {forgotPasswordURL && forgotPasswordText && (
          <span className="form-text float-end">
            <Link href={forgotPasswordURL}>{forgotPasswordText}</Link>
          </span>
        )}
      </Input>
      <div className="d-flex flex-row-reverse justify-content-between align-items-center">
        <SubmitButton text={submitText} />
        {rememberLabel && rememberKey && (
          <FormCheck
            type="checkbox"
            id="login-remember"
            label={rememberLabel}
            name={rememberKey}
            value={rememberValue}
          />
        )}
      </div>
    </ProgressiveForm>
    {externalLoginMethods}
    <div className="mt-4 mb-2 form-text text-center">
      {registerSuggestion}
    </div>
  </>
);

export default LoginForm;
