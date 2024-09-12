"use client";
import { useContext } from "react";
import Feedback from "react-bootstrap/Feedback";
import FormContext from "../../core/form-context";
import { findError } from "../../utils/form";
import SimpleInput, { type HtmlInputProps } from "./SimpleInput";

export type InputWithFeedbackProps = {
  messages?: Record<string, string | undefined>,
};

const InputWithFeedback = ({
  messages = {},
  name,
  ...props
}: HtmlInputProps & InputWithFeedbackProps) => {
  const context = useContext(FormContext);
  const inputError = findError(context.errors, name);
  return (
    <>
      <SimpleInput
        {...props}
        name={name}
        isInvalid={!!inputError}
      />
      {inputError && (
        <Feedback type="invalid">
          {messages[inputError] ?? context.messages[inputError] ?? inputError}
        </Feedback>
      )}
    </>
  );
};

export default InputWithFeedback;
