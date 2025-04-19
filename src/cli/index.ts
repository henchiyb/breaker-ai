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
  .action(async (target, opts) => {
    const result = await scanPrompt(target);
    if (opts.json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      printTable(result);
    }
  });

program.parse();
