import Group from "./Group";
import InputWithFeedback from "./InputWithFeedback";
import Label from "./Label";
import SimpleInput from "./SimpleInput";
import type { ReactNode } from "react";

export type InputProps = {
  label: string,
  type?: "text" | "email" | "password" | "number",
  name: string,
  autoComplete?: "username" | "name" | "email" | "current-password" | "new-password" | "off",
  lines?: number,
  placeholder?: string,
  defaultValue?: string,
  value?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  required?: boolean,
  autoFocus?: boolean,
  readOnly?: boolean,
  feedback?: boolean,
  messages?: Record<string, string | undefined>,
  children?: ReactNode,
};

const Input = (props: InputProps) => (
  <Group id={props.name}>
    <Label text={props.label} />
    {props.children}
    {props.feedback ? (
      <InputWithFeedback {...props} />
    ) : (
      <SimpleInput {...props} />
    )}
  </Group>
);

export default Input;
