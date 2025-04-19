import { load } from "../utils/load";

export async function maskWordsInText(target: string, wordList: string[]): Promise<string> {
  const text = await load(target);
  if (!wordList || wordList.length === 0) return text;
  let maskedText = text;
  for (const word of wordList) {
    if (word.length <= 2) {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      maskedText = maskedText.replace(regex, match => "*".repeat(match.length));
    } else {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      maskedText = maskedText.replace(
        regex,
        match => match.slice(0, 2) + "*".repeat(match.length - 2)
      );
    }
  }
  return maskedText;
}
