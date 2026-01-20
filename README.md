# Logseq DB Raycast Extension

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Raycast](https://img.shields.io/badge/Raycast-Extension-red)](https://www.raycast.com/)

A Raycast extension for working with Logseq database graphs (version 2.0.0+). Quickly capture notes, search your knowledge base, and create tasks directly from Raycast.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Quick Capture](#quick-capture)
  - [Search](#search)
  - [Add Task](#add-task)
- [How It Works](#how-it-works)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Version Compatibility](#version-compatibility)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Features

- **Quick Capture**: Quickly add notes to today's journal
- **Search**: Search across your Logseq graph
- **Add Task**: Create tasks with status, priority, and deadline

## Prerequisites

1. **Logseq 2.0.0+** with a database graph created
2. **Logseq CLI** installed globally:
   ```bash
   npm install -g @logseq/cli
   ```
3. **MCP Server enabled** in Logseq (for quick capture and tasks):
   - Open Logseq
   - Go to Settings > AI
   - Enable "MCP Server"
   - Generate an API token

## Installation

### Option 1: From Raycast Store (Recommended - Coming Soon)

Once published to the Raycast Store, you'll be able to install directly from Raycast:

1. Open Raycast
2. Search for "Store" or press `⌘,` to open settings
3. Navigate to Extensions tab
4. Search for "Logseq DB"
5. Click Install

### Option 2: Install from Source (Available Now)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Joemnewton/logseq-db-raycast-extension.git
   cd logseq-db-raycast-extension
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the extension:**
   ```bash
   npm run build
   ```

4. **Import into Raycast:**
   - Open Raycast
   - Search for "Import Extension" (or press `⌘,` → Extensions → ➕)
   - Select the `logseq-db-raycast-extension` folder
   - The extension will appear in your Raycast commands

### Configuration

After installation, configure the extension preferences:

1. Open Raycast and search for any Logseq DB command
2. Press `⌘,` to open extension preferences
3. Configure the following:
   - **Graph Path**: Full path to your graph (e.g., `~/logseq/graphs/my-graph`)
   - **API Token**: The token from Logseq Settings > AI > MCP Server
   - **Enable Timestamp** (optional): Add timestamps to captured notes
   - **Quick Capture Tag** (optional): Add a tag to all quick captures

## Usage

### Quick Capture

Use the "Quick Capture" command to add notes to today's journal. Notes will be appended to the current day's journal page.

**Requirements**: Logseq must be running with MCP Server enabled.

### Search

Use the "Search Graph" command to search across your entire graph. This works in two modes:

- **With API Token**: Searches the currently open graph in Logseq (app must be running)
- **Without API Token**: Searches the local graph directly (works offline, searches block titles only)

### Add Task

Use the "Add Task" command to create tasks with properties:

- Task content
- Status (TODO, DOING, DONE, WAITING, LATER, NOW)
- Priority (A, B, C)
- Deadline (optional date)

**Requirements**: Logseq must be running with MCP Server enabled.

## How It Works

This extension uses the official `@logseq/cli` package to interact with Logseq database graphs:

- **Quick Capture & Tasks**: Uses the `logseq append` command via the HTTP API server
- **Search**: Uses the `logseq search` command (can work with local graphs or via API)

## Troubleshooting

### "Failed to connect to HTTP API Server"

Make sure:
1. Logseq is running
2. MCP Server is enabled in Settings > AI
3. You've entered the correct API token in extension preferences

### "Graph path does not exist"

Check that:
1. The path in preferences is correct
2. The path uses `~` for your home directory (e.g., `~/logseq/graphs/my-graph`)
3. The graph has been saved at least once (Cmd/Ctrl-S in Logseq)

### "Logseq CLI not found"

Install the CLI globally:
```bash
npm install -g @logseq/cli
```

Then restart Raycast.

## Development

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/joenewton/logseq-db-raycast-extension.git
   cd logseq-db-raycast-extension
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development mode:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development mode with hot reload
- `npm run build` - Build the extension for production
- `npm run lint` - Check code for linting errors
- `npm run fix-lint` - Automatically fix linting errors
- `npm run publish` - Publish to Raycast Store

### Project Structure

```
src/
├── quick-capture.tsx  # Quick capture command
├── search.tsx         # Search command
├── add-task.tsx       # Add task command
└── utils.ts           # Shared utilities
```

## Differences from the Original Logseq Extension

The original Logseq extension works with file-based graphs (0.10.x) by reading/writing markdown files directly. This extension works with database graphs (2.0.0+) using the official CLI, which provides:

- Better reliability and future-proofing
- Support for database-specific features
- No need to parse file formats manually

## Version Compatibility

| Extension Version | Logseq Version | Logseq CLI | Node.js |
|-------------------|----------------|------------|---------|
| 1.0.0+            | 2.0.0+         | Latest     | 20.x+   |

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/joenewton/logseq-db-raycast-extension/issues)
- **Documentation**: See [SETUP.md](SETUP.md) for detailed setup instructions
- **Changelog**: See [CHANGELOG.md](CHANGELOG.md) for version history

## License

MIT - See [LICENSE](LICENSE) for details.
