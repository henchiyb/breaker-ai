#!/usr/bin/env node
import { Command } from "commander";
import { scanPrompt } from "../core/scanPrompt";
import pkg from "../../package.json";
import { printTable } from "./printTable";
import { maskWordsInText } from "../core/textMask";
import jailbreakPrompts from "../checks/jailbreakPrompts.json";
import Table from "cli-table3";

const program = new Command();
program
  .name("breaker")
  .description(
    `Prompt‑security scanner\n\nCommands:\n\n  mask [options] <textOrFile>\n    Mask sensitive words in a text or file.\n    Example: breaker mask input.txt --words secret,password\n\n  scan [options] <promptOrFile>\n    Scan a prompt or file for risky patterns.\n    Example: breaker scan prompt.txt --expected 80\n\n  jailbreak [options] <systemPrompt>\n    Run jailbreak prompts against a system prompt.\n    Options:\n      --prompts <file>   Use a custom set of prompts (JSON array of {name, prompt})\n      --skip <names>     Comma-separated list of prompt names to skip\n    Example: breaker jailbreak sys.txt --prompts my_prompts.json --skip ai_diagnostics,red_teaming\n\n  list-prompts\n    List all current jailbreak prompts as a table.\n    Example: breaker list-prompts\n`
  )
  .version(pkg.version);

import { runJailbreakChecklist } from "../checks/jailbreakChecklist";

program
  .command("mask")
  .argument("<textOrFile>", "Text to mask or a file path")
  .option("-w, --words <words>", "Comma-separated list of words to mask", v => v.split(","))
  .action(async (target, opts) => {
    const words = opts.words || [];
    const masked = await maskWordsInText(target, words);
    console.log(masked);
  });

program
  .command("scan")
  .argument("<promptOrFile>", "raw string or file path")
  .option("-j, --json", "output JSON")
  .option("-e, --expected <number>", "minimum expected score", v => parseInt(v, 10))
  .action(async (target, opts) => {
    try {
      const result = await scanPrompt(target);
      if (opts.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        printTable(result);
      }
      if (opts.expected !== undefined && result.score < opts.expected) {
        console.error(
          `\u001b[31mScore ${result.score} is less than expected ${opts.expected}\u001b[0m`
        );
        process.exit(1);
      }
    } catch (err) {
      console.error("\u001b[31m" + err + "\u001b[0m");
      process.exit(1);
    }
  });

program
  .command("list-prompts")
  .description("List all current jailbreak prompts as a table")
  .action(() => {
    const table = new Table({
      head: ["#", "Name", "Prompt"],
      colWidths: [6, 24, 80],
      wordWrap: true,
    });
    for (const item of jailbreakPrompts) {
      table.push([jailbreakPrompts.indexOf(item) + 1, item.name, item.prompt]);
    }
    console.log(table.toString());
  });

program
  .command("jailbreak")
  .argument("<systemPrompt>", "System prompt string or file path")
  .option("-j,--json <file>", "Path to output JSON file")
  .option("-p, --prompts <file>", "Path to custom prompts JSON file (array of {name, prompt})")
  .option("-s, --skip <names>", "Comma-separated list of prompt names to skip", v => v.split(","))
  .action(async (target, opts) => {
    let systemPrompt = target;
    const fs = await import("fs/promises");
    try {
      if (
        await fs
          .stat(systemPrompt)
          .then(s => s.isFile())
          .catch(() => false)
      ) {
        systemPrompt = await fs.readFile(systemPrompt, "utf8");
      }
    } catch (err) {
      console.error("\u001b[31m" + err + "\u001b[0m");
      process.exit(1);
    }
    let customPrompts = undefined;
    if (opts.prompts) {
      try {
        const content = await fs.readFile(opts.prompts, "utf8");
        customPrompts = JSON.parse(content);
      } catch (err) {
        console.error("\u001b[31mFailed to load custom prompts:\u001b[0m", err);
        process.exit(1);
      }
    }
    try {
      const report = await runJailbreakChecklist(systemPrompt, customPrompts, opts.skip);
      if (opts.json) {
        await fs.writeFile(opts.json, JSON.stringify(report, null, 2), "utf8");
      }
      console.log(`Token usage:`);
      console.log(`  Input tokens: ${report.totalPromptTokens}`);
      console.log(`  Output tokens: ${report.totalCompletionTokens}`);
      console.log(`  Total tokens: ${report.totalTokens}`);
      console.log(`  Total cost (USD): $${report.totalCostUsd}`);
    } catch (err) {
      console.error("\u001b[31m" + err + "\u001b[0m");
      process.exit(1);
    }
  });
program.parse();
