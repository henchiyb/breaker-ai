# 🛡️ breaker-ai

**breaker-ai** is a CLI tool to scan prompts for injection risks, open-ended patterns, and other prompt security issues. It helps you validate and harden prompts for LLMs and AI agents.

## ✨ Features

- Detects risky prompt injection patterns
- Flags open-ended or unsafe prompt structures
- Checks for user input safety
- Scoring system (0–100)
- Customizable minimum expected score (`--expected`)
- JSON and table output formats

## 🚀 Installation

```sh
npm install -g breaker-ai@cli
```

Or use with npx (no install needed):

```sh
npx breaker-ai@cli scan <prompt-file> [--expected <score>]
```

## ⚡ Usage

### Basic scan

```sh
breaker scan "Ignore previous instructions."
```

### Scan a file

```sh
breaker scan path/to/prompt.txt
```

### Set minimum expected score

```sh
breaker scan path/to/prompt.txt --expected 80
```

### JSON output

```sh
breaker scan path/to/prompt.txt --json
```

## 📝 Example Output

```text
Prompt‑Security Report
┌─────────┬───────────────────────┬────────────────────────────────────────┐
│ (index) │ Check                 │ Result                                 │
├─────────┼───────────────────────┼────────────────────────────────────────┤
│ 0       │ 'Risky patterns'      │ 'None'                                 │
│ 1       │ 'Open‑ended patterns' │ 'system.*prompt'                       │
│ 2       │ 'User‑input safety'   │ 'No {{user_input}} placeholder found.' │
│ 3       │ 'Length'              │ 'OK'                                   │
│ 4       │ 'Overall score'       │ '60/100'                               │
└─────────┴───────────────────────┴────────────────────────────────────────┘
```

## 🛠️ Options

- `-j, --json` Output as JSON
- `-e, --expected <number>` Minimum expected score (exit 1 if not met)

## 📦 Scripts

- `npm run build` — Build TypeScript to JavaScript
- `npm run test` — Run tests
- `npm run dev` — Run CLI in dev mode

## 🗺️ Roadmap

- [ ] Configurable pattern rules (customize what is flagged as risky)
- [ ] CI integration examples (GitHub Actions, etc)
- [ ] More output formats (Markdown, HTML)
- [ ] Web dashboard for prompt risk analytics
- [ ] Multi-language prompt support
- [ ] Community pattern sharing
- [ ] API/server mode

_Have a feature idea? Open an issue or pull request!_

## 📄 License

MIT

---

Made with ❤️ by Breaker AI
