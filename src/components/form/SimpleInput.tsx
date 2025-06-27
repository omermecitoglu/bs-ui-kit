import FormControl from "react-bootstrap/FormControl";

export type HtmlInputProps = {
  name: string,
  autoComplete?: "username" | "name" | "email" | "current-password" | "new-password" | "off",
  lines?: number,
  placeholder?: string,
  required?: boolean,
  autoFocus?: boolean,
  onFocus?: () => void,
  readOnly?: boolean,
} & ({
  type?: "text" | "email" | "url" | "password",
} | {
  type: "number",
  min?: number,
  max?: number,
}) & ({
  value: string,
  displayValue?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
} | {
  defaultValue?: string,
  value?: never,
  displayValue?: never,
});

type SimpleInputProps = {
  isInvalid?: boolean,
};

const SimpleInput = ({
  name,
  type = "text",
  lines,
  value,
  displayValue,
  ...props
}: HtmlInputProps & SimpleInputProps) => (
  <>
    {lines ? (
      <>
        {displayValue ? (
          <>
            <FormControl
              type={type}
              value={displayValue}
              {...props}
              as="textarea"
              rows={lines}
            />
            <input type="hidden" name={name} value={value} />
          </>
        ) : (
          <FormControl
            type={type}
            value={value}
            name={name}
            {...props}
            as="textarea"
            rows={lines}
          />
        )}
      </>
    ) : (
      <>
        {displayValue ? (
          <>
            <FormControl
              type={type}
              value={displayValue}
              {...props}
              as="input"
            />
            <input type="hidden" name={name} value={value} />
          </>
        ) : (

          <FormControl
            type={type}
            name={name}
            value={value}
            {...props}
            as="input"
          />
        )}
      </>
    )}
  </>
);

export default SimpleInput;
