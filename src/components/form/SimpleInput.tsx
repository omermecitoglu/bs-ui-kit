import FormControl from "react-bootstrap/FormControl";
import { omit } from "../../utils/object";
import type { InputProps } from "./Input";

type SimpleInputProps = {
  isInvalid?: boolean,
};

const SimpleInput = (props: InputProps & SimpleInputProps) => (
  <>
    {props.lines ? (
      <FormControl as="textarea" rows={props.lines} {...omit(props, "label", "children", "feedback")} />
    ) : (
      <FormControl as="input" {...omit(props, "label", "children", "feedback")} />
    )}
  </>
);

export default SimpleInput;
