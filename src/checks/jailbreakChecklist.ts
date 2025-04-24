import { JailbreakReport, jailbreakSystemPrompt } from "../core/jailbreakPrompt";

export async function runJailbreakChecklist(
  systemPrompt: string,
  customPrompts?: { name: string; prompt: string }[],
  skipNames?: string[]
): Promise<JailbreakReport> {
  return await jailbreakSystemPrompt(systemPrompt, undefined, customPrompts, skipNames);
}
