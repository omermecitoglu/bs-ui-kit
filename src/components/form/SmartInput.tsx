import { type ReactNode } from "react";
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
  /** Default value for the input field. */
  defaultValue?: unknown,
  /** Placeholder text for the input field. */
  placeholder?: string,
  /** Validation error messages for the input field. */
  messages?: Record<string, string>,
  /** Optional class name for the input element. */
  className?: string,
};

/**
 * Renders an input element based on the provided Zod schema and validation props.
 */
const SmartInput = (props: SmartInputProps): ReactNode => {
  switch (props.schema._zod.def.type) {
    case "default": {
      if ("unwrap" in props.schema && typeof props.schema.unwrap === "function") {
        return (
          <SmartInput
            {...props}
            schema={props.schema.unwrap()}
            placeholder={props.schema.parse(undefined) as string}
          />
        );
      }
      throw new Error('Unable to unwrap schema of type: "default"');
    }
    case "string":
      return (
        <Input
          type={props.isEmail ? "email" : (props.isUrl ? "url" : "text")}
          name={props.name}
          label={props.label}
          defaultValue={props.defaultValue as string}
          placeholder={props.placeholder}
          required={props.isRequired}
          minLength={props.minLength}
          maxLength={props.maxLength}
          messages={props.messages}
          className={props.className}
        />
      );
    case "number":
      return (
        <Input
          type="number"
          name={props.name}
          label={props.label}
          defaultValue={props.defaultValue as string}
          placeholder={props.placeholder}
          required={props.isRequired}
          min={props.greaterThan}
          max={props.lessThan}
          messages={props.messages}
          className={props.className}
        />
      );
    case "file":
    default:
      return <div className="text-danger">{`Unknown Type: ${props.schema._zod.def.type}`}</div>;
  }
};

export default SmartInput;
