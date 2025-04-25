# 🛡️ Breaker-AI

Proactively Stress-Test Your AI Before Attackers Do.

Breaker-AI is an open-source CLI tool that detects prompt injection risks, jailbreak vulnerabilities, and security flaws inside your AI prompts. It empowers security teams, developers, and AI researchers to validate and harden LLM prompts — before real attackers can exploit them.

## ✨ Key Features

- **Jailbreak Resistance Testing**: Automatically runs your system prompts against real-world jailbreak attempts and evaluates vulnerabilities.
- **Prompt Injection Detection**: Scans for risky patterns, unsafe prompt structures, and user-input manipulation risks.
- **Customizable Rules & Thresholds**: Set expected minimum scores, skip specific tests, or define what "secure" means for your needs.
- **Clear Reports**: Output results as human-readable tables or machine-readable JSON.
- **Agent-Ready (coming soon!)**: Adaptive Breaker-AI Attack Agents will mutate and evolve attacks dynamically — simulating real adversaries.

## 🚀 Installation
Install globally via npm:

```bash
npm install -g breaker-ai
```

Or run instantly without installing:

```bash
npx breaker-ai scan <prompt-file> [--expected <score>]
```

## ⚡ Quick Usage

### 🆕 Jailbreak Resistance Testing

Test your system prompt against a suite of jailbreak attacks:

```bash
OPENAI_API_KEY=your-api-key npx breaker-ai jailbreak "path/to/systemPrompt.txt"
```

**Options:**

Use a different model:

```bash
export OPENAI_MODEL=gpt-4
```

Use OpenRouter (e.g., Claude, Mistral):

```bash
export OPENAI_BASE_URL=https://openrouter.ai/api/v1
export OPENAI_MODEL=claude-3-sonnet
```

List all available jailbreak prompts:

```bash
breaker-ai list-prompts
```

## 🛡️ Example CLI Output

```
Jailbreak Report
┌────────────────────┬─────────────────────────────────────┬──────────┐
│ Attack Name         │ Model Response                      │ Passed?  │
├────────────────────┼─────────────────────────────────────┼──────────┤
│ AI Diagnostics Leak │ [INTERNAL LOGS: GPT-4 info dumped]   │ ❌       │
│ Movie Scene Attack  │ "I can't assist with that request." │ ✅       │
└────────────────────┴─────────────────────────────────────┴──────────┘
```

## 📜 Basic Prompt Security Scan

```bash
breaker-ai scan "path/to/prompt.txt"
```

**Outputs:**

```
Prompt‑Security Report
┌─────────┬───────────────────────┬─────────────────────────────┐
│ (index) │ Check                 │ Result                      │
├─────────┼───────────────────────┼─────────────────────────────┤
│ 0       │ Risky Patterns        │ None                        │
│ 1       │ Open-ended Structures │ system.*prompt              │
│ 2       │ User Input Safety     │ No {{user_input}} found.    │
│ 3       │ Length Check          │ OK                          │
│ 4       │ Overall Score         │ 60/100                      │
└─────────┴───────────────────────┴─────────────────────────────┘
```

Set Minimum Expected Score:

```bash
breaker-ai scan path/to/prompt.txt --expected 80
```

Export JSON report:

```bash
breaker-ai scan path/to/prompt.txt --json /path/to/result.json
```

## 🛠️ Utility: Mask Sensitive Words

```bash
breaker-ai mask "Hello world" --words Hello,world
# Output: He***wo***
```

Or mask words inside a file:

```bash
breaker-ai mask path/to/file.txt --words secret,password
```

## 🗺️ Roadmap

- 🔥 Configurable pattern rules
- 🔥 CI/CD integration (examples for GitHub Actions, etc)
- 🔥 HTML and Markdown output formats
- 🔥 Web dashboard for visual prompt risk analytics
- 🔥 Multi-language support
- 🔥 Breaker-AI Attack Agents (dynamic adversarial attacks)
- 🔥 API / server mode for real-time prompt scanning
- 🔥 Community-shared attack patterns

(Have an idea? Open an issue or pull request!)

## 📚 API Usage

Use Breaker-AI as a library inside your JavaScript / TypeScript projects:

```typescript
import { maskWordsInText } from "breaker-ai";

(async () => {
  const masked = await maskWordsInText("Hello world", ["Hello", "world"]);
  console.log(masked); // "He***wo***"
})();
```

## 📄 License
Breaker-AI is open-sourced under the MIT License. Made with ❤️ by the Breaker-AI Team.

🚀 Stay ahead of the AI security curve.
🛡️ Start stress-testing your AI today with Breaker-AI.
