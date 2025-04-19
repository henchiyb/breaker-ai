# Contributing to breaker-ai

## Branching and Release Strategy

- All development should be performed in short-lived feature or fix branches, branched from `main` (e.g., `feature/your-feature`, `fix/your-bug`).
- Submit changes via pull request (PR) to the `main` branch. All PRs require review before merging.
- The `main` branch is always deployable and production-ready.
- Releases are created by tagging the `main` branch with a version (e.g., `v1.2.3`).
- After merging a PR intended for release, bump the version in `package.json` and create a new release tag.
- Optionally, for larger releases, you may use a `release/` branch for last-minute fixes before tagging.

This workflow keeps the repository simple and friendly for open source collaboration, while ensuring code quality and a clear release process.

Thank you for your interest in contributing! 🎉

## How to contribute

- **Bug reports:** Open an issue describing the problem and steps to reproduce.
- **Feature requests:** Open an issue with your idea and use case.
- **Pull requests:**
  1. Fork the repo and create your branch from `main`.
  2. Run `npm install` and make sure tests and lint pass.
  3. Add your code and tests.
  4. Run `npm run test` and `npm run lint`.
  5. Open a pull request with a clear description.

## Code style

- Use TypeScript and follow the existing code style.
- Run `npm run lint` before submitting.
- Keep pull requests focused and minimal.

## Community

- Be respectful and inclusive.
- All contributions are welcome!

---

Made with ❤️ by Breaker AI
