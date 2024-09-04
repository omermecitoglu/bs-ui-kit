import { type ReactNode } from "react";
import FormWithState from "./FormWithState";

type ProgressiveFormProps = {
  action: (_: unknown, formData: FormData) => Promise<Record<string, string>>,
  messages?: Record<string, string | undefined>,
  hideAfterPost?: boolean,
  className?: string,
  children: ReactNode,
};

const ProgressiveForm = ({
  children,
  ...otherProps
}: ProgressiveFormProps) => {
  return (
    <FormWithState {...otherProps}>{children}</FormWithState>
  );
};

export default ProgressiveForm;
