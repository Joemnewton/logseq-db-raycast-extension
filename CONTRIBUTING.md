# Contributing to Logseq DB Raycast Extension

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## How to Report Bugs

If you find a bug, please [open an issue](https://github.com/joenewton/logseq-db-raycast-extension/issues/new?template=bug_report.md) with:

- A clear description of the bug
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment details (Logseq version, macOS version, extension version)
- Any relevant logs or screenshots

## How to Suggest Features

Have an idea for a new feature? [Open a feature request](https://github.com/joenewton/logseq-db-raycast-extension/issues/new?template=feature_request.md) with:

- A clear description of the feature
- The use case or problem it solves
- Any implementation ideas you have

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/joenewton/logseq-db-raycast-extension.git
   cd logseq-db-raycast-extension
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Logseq CLI globally:**
   ```bash
   npm install -g @logseq/cli
   ```

4. **Start development mode:**
   ```bash
   npm run dev
   ```

5. **Configure the extension in Raycast:**
   - Import the extension in Raycast
   - Set your graph path in preferences
   - Enable MCP Server in Logseq (Settings > AI)
   - Add your API token to extension preferences

## Code Style

This project uses ESLint and Prettier for code formatting:

- Run `npm run lint` to check for issues
- Run `npm run fix-lint` to automatically fix issues
- Follow the existing code style in the project
- Use TypeScript for type safety

## Pull Request Process

1. **Fork the repository** and create a new branch from `main`

2. **Make your changes:**
   - Write clear, concise commit messages
   - Keep changes focused and atomic
   - Add comments for complex logic

3. **Test your changes:**
   - Test all three commands (Quick Capture, Search, Add Task)
   - Verify error handling works correctly
   - Test with different configurations

4. **Update documentation:**
   - Update README.md if adding features or changing usage
   - Update CHANGELOG.md following Keep a Changelog format
   - Add comments to code where helpful

5. **Submit a pull request:**
   - Use the PR template provided
   - Link to any related issues
   - Provide a clear description of changes
   - Wait for review and address feedback

## Code of Conduct

Please be respectful and constructive in all interactions. We aim to foster a welcoming and inclusive community.

- Be kind and courteous
- Respect differing viewpoints
- Provide constructive feedback
- Focus on what is best for the community

## Questions?

If you have questions about contributing, feel free to [open an issue](https://github.com/joenewton/logseq-db-raycast-extension/issues) with your question.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
