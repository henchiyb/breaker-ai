#!/usr/bin/env node
import { Command } from "commander";
import { scanPrompt } from "../core/scanPrompt";
import pkg from "../../package.json";
import { printTable } from "./printTable";
const program = new Command();
program.name("breaker").description("Prompt‑security scanner").version(pkg.version);

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

program.parse();
