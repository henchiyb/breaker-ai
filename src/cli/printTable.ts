import { ScanReport } from "../core/scanPrompt";
import chalk from "chalk";

export function printTable(r: ScanReport) {
  console.log(chalk.bold("\nPrompt‑Security Report\n"));
  console.table([
    { Check: "Risky patterns", Result: r.risky.join(", ") || "None" },
    { Check: "Open‑ended patterns", Result: r.open.join(", ") || "None" },
    { Check: "User‑input safety", Result: r.userInputSafety || "OK" },
    { Check: "Length", Result: r.lengthWarning || "OK" },
    { Check: "Overall score", Result: r.score + "/100" },
  ]);
  console.log("");
}
