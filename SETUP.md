# Setup and Testing Guide

## Current Status

✅ Extension built successfully!
✅ Logseq CLI installed and working
✅ All three commands implemented: Quick Capture, Search, Add Task

## Next Steps to Test the Extension

### 1. Enable Logseq MCP Server

For Quick Capture and Add Task features to work, you need to enable the HTTP API Server in Logseq:

1. Open Logseq (version 2.0.0 or later)
2. Go to **Settings** (gear icon)
3. Navigate to **AI** section
4. Find **MCP Server** option
5. Toggle it ON
6. Click **Generate Token** button
7. Copy the generated token (you'll need this in step 3)

### 2. Import the Extension into Raycast

To test the extension locally:

1. Open Raycast
2. Search for "Import Extension"
3. Select "Import Extension" command
4. Navigate to this directory: `/Users/joenewton/Documents/Coding & Development/Logseq Dev/logseq-db-raycast-extension`
5. Click "Import"

Raycast will now load your extension in development mode.

### 3. Configure Extension Preferences

Once imported, configure the extension:

1. In Raycast, search for "Extensions"
2. Find "Logseq DB" in your extensions list
3. Click on it and select "Configure Extension"
4. Fill in the required settings:
   - **Graph Path**: `~/logseq/graphs/Joe's Logseq PKM`
   - **API Server Token**: Paste the token from step 1
   - **Enable Timestamp**: Check if you want timestamps on notes
   - **Quick Capture Tag**: Optionally add a tag (e.g., "quick-capture")

### 4. Test Each Feature

#### Test Quick Capture

1. Open Raycast (Cmd+Space)
2. Type "Quick Capture" and press Enter
3. Type a test note: "Test note from Raycast extension"
4. Press Enter to submit
5. Open Logseq and check today's journal - your note should appear!

#### Test Search

1. First, make sure you have some content in your Logseq graph
2. Open Raycast
3. Type "Search Graph" and press Enter
4. Type a search term that exists in your graph
5. You should see matching results
6. Select a result and press Cmd+C to copy it

#### Test Add Task

1. Open Raycast
2. Type "Add Task" and press Enter
3. Fill in the form:
   - Task: "Test task from Raycast"
   - Status: Select "TODO"
   - Priority: Select "A (Highest)"
   - Deadline: Pick a date
4. Press Enter to submit
5. Open Logseq and check today's journal - your task should appear with all properties!

### 5. Verify Task Properties in Logseq

When you add a task, it should appear in Logseq with the following format:

```
TODO Test task from Raycast
logseq.property/priority:: A
logseq.property/deadline:: 2026-01-20
```

These are the new DB version property names (different from the old file-based version).

## Troubleshooting

### "Failed to connect to HTTP API Server"

**Solution:**
- Make sure Logseq is running
- Verify MCP Server is enabled in Settings > AI
- Check that your API token is correct in extension preferences
- Try regenerating the token in Logseq and updating it in Raycast

### "Graph path does not exist"

**Solution:**
- Verify the path: `~/logseq/graphs/Joe's Logseq PKM`
- Make sure you've saved your graph at least once in Logseq (Cmd+S)
- Check that `db.sqlite` file exists in the graph directory

### Search returns no results

**Solution:**
- If using without API token (offline mode), search only looks at block titles
- For better search results, make sure API token is configured
- Try searching for text you know exists in your graph

### "Logseq CLI not found"

**Solution:**
- The CLI should already be installed, but if needed: `npm install -g @logseq/cli`
- Restart Raycast after installing
- Verify with: `logseq --version`

## Development Commands

```bash
# Build the extension
npm run build

# Run in development mode (auto-reload on changes)
npm run dev

# Lint code
npm run lint

# Fix linting issues
npm run fix-lint
```

## Adding an Icon (Optional)

To add a proper icon to the extension:

1. Download the Logseq logo (512x512 PNG) from one of these sources:
   - https://www.svgrepo.com/svg/517595/logseq
   - https://dashboardicons.com/icons/logseq
   - https://iconbuddy.com/simple-icons/logseq

2. Save it as `assets/command-icon.png` (512x512 pixels)

3. Update `package.json` to add:
   ```json
   "icon": "command-icon.png",
   ```

4. Rebuild: `npm run build`

## What's Different from the Original Extension?

The original Logseq Raycast extension (for 0.10.x) worked by:
- Directly reading/writing markdown files
- Parsing file-based configuration
- Working offline without Logseq running

This new DB version extension:
- Uses the official Logseq CLI
- Requires the HTTP API Server for writes (quick capture, tasks)
- Works with SQLite database storage
- Uses the new property namespacing (e.g., `logseq.property/priority`)
- More reliable and future-proof

## Need Help?

If you encounter issues:
1. Check Logseq version (must be 2.0.0+)
2. Verify CLI is installed: `logseq --version`
3. Make sure MCP Server is enabled and token is correct
4. Check Raycast console for error messages (Cmd+Shift+C in Raycast)
