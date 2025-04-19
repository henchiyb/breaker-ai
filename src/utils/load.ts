import fs from "node:fs/promises";

export async function load(s: string) {
  try {
    await fs.access(s);
    return fs.readFile(s, "utf-8");
  } catch {
    return s;
  }
}
export const matchAny = (t: string, pats: RegExp[]) =>
  pats.filter(p => p.test(t)).map(p => p.source);
