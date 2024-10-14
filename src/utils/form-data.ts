function kebabToCamel(kebab: string): string {
  return kebab.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

function fixKey(key: string) {
  return kebabToCamel(key.replace(/\[\]$/, ""));
}

export function parseFormData(formData: FormData) {
  return Array.from(formData.keys()).reduce((bundle, key) => ({
    ...bundle,
    [fixKey(key)]: key.endsWith("[]") ? formData.getAll(key) : formData.get(key),
  }), {} as Record<string, unknown>);
}
