"use client";
import { useContext } from "react";
import Feedback from "react-bootstrap/Feedback";
import FormContext from "../../core/form-context";
import SimpleInput, { type HtmlInputProps } from "./SimpleInput";

export type InputWithFeedbackProps = {
  messages?: Record<string, string | undefined>,
};

const InputWithFeedback = ({
  messages,
  name,
  ...props
}: HtmlInputProps & InputWithFeedbackProps) => {
  const context = useContext(FormContext);
  const inputError = context.errors[name];
  return (
    <>
      <SimpleInput
        {...props}
        name={name}
        isInvalid={!!inputError}
      />
      {inputError && (
        <Feedback type="invalid">
          {(messages ? messages[inputError] : null) ?? context.messages[inputError] ?? inputError}
        </Feedback>
      )}
    </>
  );
};

export default InputWithFeedback;
