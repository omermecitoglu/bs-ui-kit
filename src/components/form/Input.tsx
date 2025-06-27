import Group from "./Group";
import InputWithFeedback, { type InputWithFeedbackProps } from "./InputWithFeedback";
import Label from "./Label";
import SimpleInput, { type HtmlInputProps } from "./SimpleInput";
import type { ComponentProps, ReactNode } from "react";

export type InputProps = {
  label?: string,
  /**
   * @deprecated This prop is deprecated and will be removed in future versions.
   */
  feedback?: boolean,
  children?: ReactNode,
};

const Input = ({
  name,
  label,
  feedback,
  messages,
  children,
  ...props
}: InputProps & HtmlInputProps & ComponentProps<"input"> & InputWithFeedbackProps) => (
  <Group id={name}>
    {label && <Label text={label} />}
    {children}
    {(!!feedback || !!messages) ? (
      <InputWithFeedback name={name} messages={messages} {...props} />
    ) : (
      <SimpleInput name={name} {...props} />
    )}
  </Group>
);

export default Input;
