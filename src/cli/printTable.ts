import { ScanReport } from "../core/scanPrompt";
import chalk from "chalk";
import Table from "cli-table3";

export function printTable(r: ScanReport) {
  console.log(chalk.bold("\nPrompt‑Security Report\n"));
  const table = new Table({
    head: ["Check", "Result"],
    colWidths: [30, 70],
    wordWrap: true,
  });
  table.push(
    ["Risky patterns", r.risky.join(", ") || "None"],
    ["Open‑ended patterns", r.open.join(", ") || "None"],
    ["User‑input safety", r.userInputSafety || "OK"],
    ["Length", r.lengthWarning || "OK"],
    ["Overall score", r.score + "/100"]
  );
  console.log(table.toString());
  console.log("");
}
