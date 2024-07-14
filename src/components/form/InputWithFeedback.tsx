"use client";
import { useContext } from "react";
import Feedback from "react-bootstrap/Feedback";
import FormContext from "../../core/form-context";
import SimpleInput from "./SimpleInput";
import type { InputProps } from "./Input";

const InputWithFeedback = (props: InputProps) => {
  const errors = useContext(FormContext);
  return (
    <>
      <SimpleInput
        {...props}
        isInvalid={!!errors[props.name]}
      />
      {errors[props.name] && (
        <Feedback type="invalid">
          {errors[props.name]}
        </Feedback>
      )}
    </>
  );
};

export default InputWithFeedback;
