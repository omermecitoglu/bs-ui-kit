import { type ZodIssue, ZodIssueCode } from "zod/v3";

function handleZodIssue(issue: ZodIssue) {
  switch (issue.code) {
    case ZodIssueCode.custom:
      return issue.params?.customErrorCode ?? issue.message;
    case ZodIssueCode.invalid_string:
      return `invalid_${issue.validation}`;
    case ZodIssueCode.too_small:
      return "too_small";
    case ZodIssueCode.too_big:
      return "too_big";
    default:
      return "unknown_error";
  }
}

export function bundleErrors(issues: ZodIssue[]) {
  return issues.reduce((bundle, issue) => {
    const [location] = issue.path;
    return {
      ...bundle,
      [location]: handleZodIssue(issue).toUpperCase(),
    };
  }, {} as Record<string, string>);
}
