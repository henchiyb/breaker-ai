// Warn when {{user_input}} is not quoted or delimited
export function checkUserInputSafety(template: string): string | null {
  const placeholder = "{{user_input}}";

  if (!template.includes(placeholder)) {
    return "No {{user_input}} placeholder found.";
  }

  // allow " {{user_input}} ", ' {{user_input}} ', ` {{user_input}} `
  const safe = new RegExp(`['"\`][^\\n]*${placeholder}[^\\n]*['"\`]`);
  return safe.test(template) ? null : "User input not wrapped in quotes → injection risk.";
}
