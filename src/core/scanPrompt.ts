import fs from "node:fs/promises";

const risky = [/ignore.*instruction/i, /system.*prompt/i];
const open = [/answer anything/i, /no restriction/i];

export type Report = {
  risky: string[];
  open: string[];
  lengthWarning?: string;
};

export async function scanPrompt(input: string): Promise<Report> {
  const text = await load(input);
  return {
    risky: matches(text, risky),
    open: matches(text, open),
    lengthWarning:
      text.length > 3000
        ? "Prompt very long – may overflow context"
        : undefined,
  };
}

async function load(str: string) {
  try {
    await fs.access(str);
    return fs.readFile(str, "utf8");
  } catch {
    return str;
  }
}
function matches(t: string, pats: RegExp[]) {
  return pats.filter((p) => p.test(t)).map((p) => p.source);
}
