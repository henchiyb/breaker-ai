import { describe, it, expect } from "vitest";
import { maskWordsInText } from "../src/core/textMask";

describe("maskWordsInText", () => {
  it("masks words in the text as expected", async () => {
    expect(await maskWordsInText("Hello", ["Hello"])).toBe("He***");
    expect(await maskWordsInText("Hello there!", ["Hello"])).toBe("He*** there!");
    expect(await maskWordsInText("Hello hello HeLLo", ["Hello"])).toBe("He*** he*** He***");
    expect(await maskWordsInText("Testing test", ["test"])).toBe("Testing te**");
    expect(await maskWordsInText("This is a test", ["test"])).toBe("This is a te**");
    expect(await maskWordsInText("ab abc abcd", ["ab", "abc", "abcd"])).toBe("** ab* ab**");
  });

  it("returns original text if wordList is empty", async () => {
    expect(await maskWordsInText("Hello", [])).toBe("Hello");
  });

  it("masks words with length <= 2 as asterisks", async () => {
    expect(await maskWordsInText("Hi ho", ["Hi", "ho"])).toBe("** **");
    expect(await maskWordsInText("a ab abc", ["a", "ab", "abc"])).toBe("* ** ab*");
  });
});
