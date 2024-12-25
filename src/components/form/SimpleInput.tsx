import FormControl from "react-bootstrap/FormControl";

export type HtmlInputProps = {
  name?: string,
  autoComplete?: "username" | "name" | "email" | "current-password" | "new-password" | "off",
  lines?: number,
  placeholder?: string,
  required?: boolean,
  autoFocus?: boolean,
  onFocus?: () => void,
  readOnly?: boolean,
} & ({
  type?: "text" | "email" | "password",
} | {
  type: "number",
  min?: number,
  max?: number,
}) & ({
  value: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
} | {
  defaultValue?: string,
});

type SimpleInputProps = {
  isInvalid?: boolean,
};

const SimpleInput = ({
  type = "text",
  lines,
  ...props
}: HtmlInputProps & SimpleInputProps) => (
  <>
    {lines ? (
      <FormControl type={type} {...props} as="textarea" rows={lines} />
    ) : (
      <FormControl type={type} {...props} as="input" />
    )}
  </>
);

export default SimpleInput;
