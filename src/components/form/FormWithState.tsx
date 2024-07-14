"use client";
import classNames from "classnames";
import { type ReactNode, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useFormState } from "react-dom";
import FormContext from "../../core/form-context";

type FormWithStateProps = {
  action: (_: unknown, formData: FormData) => Promise<Record<string, string>>,
  messages?: Record<string, string | undefined>,
  hideAfterPost?: boolean,
  className?: string,
  children: ReactNode,
};

const FormWithState = ({
  action,
  messages = {},
  hideAfterPost = false,
  className,
  children,
}: FormWithStateProps) => {
  const [show, setShow] = useState(true);
  const [formState, formAction] = useFormState(action, null);
  useEffect(() => setShow(true), [formState]);
  const dismiss = () => setShow(false);

  return (
    <>
      {show && formState && formState.success && (
        <Alert variant="success" onClose={dismiss} dismissible>{messages[formState.success] ?? formState.success}</Alert>
      )}
      {show && formState && formState.danger && (
        <Alert variant="danger" onClose={dismiss} dismissible>{messages[formState.danger] ?? formState.danger}</Alert>
      )}
      {show && formState && formState.warning && (
        <Alert variant="warning" onClose={dismiss} dismissible>{messages[formState.warning] ?? formState.warning}</Alert>
      )}
      {show && formState && formState.info && (
        <Alert variant="info" onClose={dismiss} dismissible>{messages[formState.info] ?? formState.info}</Alert>
      )}
      <FormContext.Provider value={formState ?? {}}>
        {hideAfterPost && formState?.success ? false : (
          <Form action={formAction as unknown as string} className={classNames("d-flex flex-column gap-3", className)}>
            {children}
          </Form>
        )}
      </FormContext.Provider>
    </>
  );
};

export default FormWithState;
