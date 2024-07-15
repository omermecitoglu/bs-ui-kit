"use client";
import { useContext } from "react";
import Feedback from "react-bootstrap/Feedback";
import FormContext from "../../core/form-context";
import SimpleInput from "./SimpleInput";
import type { InputProps } from "./Input";

const InputWithFeedback = (props: InputProps) => {
  const { errors, messages } = useContext(FormContext);
  const inputError = errors[props.name];
  return (
    <>
      <SimpleInput
        {...props}
        isInvalid={!!inputError}
      />
      {inputError && (
        <Feedback type="invalid">
          {(props.messages ? props.messages[inputError] : null) ?? messages[inputError] ?? inputError}
        </Feedback>
      )}
    </>
  );
};

export default InputWithFeedback;
