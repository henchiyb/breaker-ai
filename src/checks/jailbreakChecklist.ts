import { JailbreakReport, jailbreakSystemPrompt } from "../core/jailbreakPrompt";

export async function runJailbreakChecklist(systemPrompt: string): Promise<JailbreakReport> {
  return await jailbreakSystemPrompt(systemPrompt);
}
