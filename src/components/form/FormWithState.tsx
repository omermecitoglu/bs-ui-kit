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

/**
 * @deprecated use ProgressiveForm instead
 */
const FormWithState = ({
  action,
  messages = {},
  hideAfterPost = false,
  className,
  children,
}: FormWithStateProps) => {
  const [show, setShow] = useState(true);
  const [formState, formAction] = useFormState(action, {});
  useEffect(() => setShow(true), [formState]);
  const dismiss = () => setShow(false);

  return (
    <>
      {show && formState["[success]"] && (
        <Alert variant="success" onClose={dismiss} dismissible>
          {messages[formState["[success]"]] ?? formState["[success]"]}
        </Alert>
      )}
      {show && formState["[danger]"] && (
        <Alert variant="danger" onClose={dismiss} dismissible>
          {messages[formState["[danger]"]] ?? formState["[danger]"]}
        </Alert>
      )}
      {show && formState["[warning]"] && (
        <Alert variant="warning" onClose={dismiss} dismissible>
          {messages[formState["[warning]"]] ?? formState["[warning]"]}
        </Alert>
      )}
      {show && formState["[info]"] && (
        <Alert variant="info" onClose={dismiss} dismissible>
          {messages[formState["[info]"]] ?? formState["[info]"]}
        </Alert>
      )}
      <FormContext.Provider value={{ errors: formState, messages }}>
        {hideAfterPost && formState["[success]"] ? false : (
          <Form
            action={formAction as unknown as string}
            className={classNames("d-flex flex-column gap-3", className)}
          >
            {children}
          </Form>
        )}
      </FormContext.Provider>
    </>
  );
};

export default FormWithState;
