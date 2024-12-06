"use client";
import classNames from "classnames";
import { type ReactNode, useActionState, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import FormContext from "../../core/form-context";

type FormWithStateProps = {
  action: (_: unknown, formData: FormData) => Promise<Record<string, string>>,
  messages?: Record<string, string | undefined>,
  hideAfterPost?: boolean,
  /**
   * @deprecated This prop is deprecated and will be removed in future versions.
   */
  noGap?: boolean,
  /**
   * @deprecated This prop is deprecated and will be removed in future versions.
   */
  onStateChange?: (newState: Record<string, string>) => void,
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
  noGap,
  onStateChange,
  className,
  children,
}: FormWithStateProps) => {
  const [show, setShow] = useState(true);
  const [formState, formAction, _isPending] = useActionState(action, {});
  useEffect(() => {
    if (onStateChange) {
      onStateChange(formState);
    }
    setShow(true);
  }, [formState]);
  const dismiss = () => setShow(false);

  return (
    <>
      {show && formState["[success]"] && (
        <Alert variant="success" onClose={dismiss} dismissible={!hideAfterPost}>
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
            className={classNames("d-flex flex-column", !noGap && "gap-3", className)}
          >
            {children}
          </Form>
        )}
      </FormContext.Provider>
    </>
  );
};

export default FormWithState;
