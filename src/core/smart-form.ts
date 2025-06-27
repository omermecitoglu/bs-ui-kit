import type { $ZodCheck, $ZodChecks, $ZodStringFormatChecks } from "zod/v4/core";

/**
 * Validation rules extracted from Zod schema checks for use in smart forms.
 */
export type SmartFormValidations = {
  /** Is the field required? */
  isRequired: boolean,
  /** Value must be less than this number (exclusive or inclusive based on Zod check). */
  lessThan?: number,
  /** Value must be greater than this number (exclusive or inclusive based on Zod check). */
  greaterThan?: number,
  /** String must have at least this many characters. */
  minLength?: number,
  /** String must have at most this many characters. */
  maxLength?: number,
  /** Is the field validating email format? */
  isEmail: boolean,
  /** Is the field validating URL format? */
  isUrl: boolean,
};

/**
 * Extracts validation rules from an array of Zod checks for use in smart forms.
 */
export function getValidations(checks: $ZodCheck[] = [], isRequired: boolean): SmartFormValidations {
  const result: SmartFormValidations = { isRequired, isEmail: false, isUrl: false };
  for (const check of checks) {
    const def = (check as $ZodChecks)._zod.def;
    switch (def.check) {
      case "less_than":
        result.lessThan = def.inclusive ? def.value as number : (def.value as number - 1);
        break;
      case "greater_than":
        result.greaterThan = def.inclusive ? def.value as number : (def.value as number + 1);
        break;
      case "min_length":
        result.minLength = def.minimum;
        break;
      case "max_length":
        result.maxLength = def.maximum;
        break;
      case "string_format": {
        switch ((check as $ZodStringFormatChecks)._zod.def.format) {
          case "email":
            result.isEmail = true;
            break;
          case "url":
            result.isUrl = true;
            break;
        }
      }
    }
  }
  return result;
}
