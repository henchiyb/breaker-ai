export function lengthWarning(text: string): string | undefined {
  return text.length > 3000 ? 'Prompt is very long; risk of context overflow.' : undefined;
}
