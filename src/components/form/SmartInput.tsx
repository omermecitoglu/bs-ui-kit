import Input from "./Input";
import type { SmartFormValidations } from "../../core/smart-form";
import type { ZodType } from "zod/v4";

/**
 * SmartInput component props.
 */
type SmartInputProps = SmartFormValidations & {
  /** Name of the input field. */
  name: string,
  /** Label for the input field. */
  label: string,
  /** The Zod object schema describing the input. */
  schema: ZodType<unknown>,
  /** Optional class name for the input element. */
  className?: string,
};

/**
 * Renders an input element based on the provided Zod schema and validation props.
 */
const SmartInput = ({
  name,
  label,
  schema,
  className,
  /* SmartFormValidations */
  isRequired,
  lessThan,
  greaterThan,
  minLength,
  maxLength,
  isEmail,
  isUrl,
}: SmartInputProps) => {
  switch (schema._zod.def.type) {
    case "string":
      return (
        <Input
          type={isEmail ? "email" : (isUrl ? "url" : "text")}
          name={name}
          label={label}
          required={isRequired}
          minLength={minLength}
          maxLength={maxLength}
          className={className}
        />
      );
    case "number":
      return (
        <Input
          type="number"
          name={name}
          label={label}
          required={isRequired}
          min={greaterThan}
          max={lessThan}
          className={className}
        />
      );
    case "file":
    default:
      return <div className="text-danger">{`Unknown Type: ${schema._zod.def.type}`}</div>;
  }
};

export default SmartInput;
