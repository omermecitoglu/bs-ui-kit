"use client";
import { type ReactNode } from "react";
import FormWithState from "./FormWithState";

type ProgressiveFormProps = {
  action: (_: unknown, formData: FormData) => Promise<Record<string, string>>,
  messages?: Record<string, string | undefined>,
  hideAfterPost?: boolean,
  /**
   * @deprecated This prop is deprecated and will be removed in future versions.
   */
  noGap?: boolean,
  /**
   * @deprecated This prop is deprecated and will be removed in future versions.
   */
  onStateChange?: (newState: Record<string, string>) => void,
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
