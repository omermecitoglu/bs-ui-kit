import { camelCase, constantCase, kebabCase, pascalCase, snakeCase } from "change-case";

export function findError(errorBundle: Record<string, string>, inputName: string) {
  return (
    errorBundle[camelCase(inputName)] ||
    errorBundle[constantCase(inputName)] ||
    errorBundle[kebabCase(inputName)] ||
    errorBundle[pascalCase(inputName)] ||
    errorBundle[snakeCase(inputName)] ||
    undefined
  );
}
