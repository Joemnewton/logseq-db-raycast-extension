import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";
import { homedir } from "os";

const execAsync = promisify(exec);

export interface Preferences {
  graphPath: string;
  apiToken?: string;
  enableTimestamp: boolean;
  quickCaptureTag?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
}

/**
 * Get user preferences
 */
export function getPreferences(): Preferences {
  return getPreferenceValues<Preferences>();
}

/**
 * Expand ~ to home directory
 */
export function expandPath(path: string): string {
  if (path.startsWith("~")) {
    return path.replace("~", homedir());
  }
  return path;
}

/**
 * Validate that the graph path exists
 */
export function validateGraphPath(graphPath: string): { valid: boolean; message?: string } {
  const expandedPath = expandPath(graphPath);

  if (!existsSync(expandedPath)) {
    return {
      valid: false,
      message: `Graph path does not exist: ${expandedPath}`,
    };
  }

  const dbPath = `${expandedPath}/db.sqlite`;
  if (!existsSync(dbPath)) {
    return {
      valid: false,
      message: `No database found at ${dbPath}. Make sure this is a Logseq DB graph and it has been saved at least once.`,
    };
  }

  return { valid: true };
}

/**
 * Execute a Logseq CLI command
 */
async function executeLogseqCommand(args: string[]): Promise<{ stdout: string; stderr: string }> {
  try {
    const command = `logseq ${args.join(" ")}`;
    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer for large results
    });
    return { stdout, stderr };
  } catch (error: any) {
    throw new Error(`Logseq CLI error: ${error.message}`);
  }
}

/**
 * Format timestamp for notes
 */
export function formatTimestamp(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Add timestamp and tags to content
 */
export function formatContent(content: string, addTimestamp: boolean, tag?: string): string {
  let formatted = content;

  if (addTimestamp) {
    formatted = `${formatTimestamp()} ${formatted}`;
  }

  if (tag && tag.trim()) {
    const cleanTag = tag.trim().replace(/^#/, "");
    formatted = `${formatted} #${cleanTag}`;
  }

  return formatted;
}

/**
 * Append content to current journal using API server
 */
export async function appendToJournal(content: string): Promise<void> {
  const preferences = getPreferences();

  if (!preferences.apiToken) {
    throw new Error(
      "API Server Token is required for quick capture. Please set it in extension preferences.\\n\\n" +
      "To get your token:\\n" +
      "1. Open Logseq\\n" +
      "2. Go to Settings > AI\\n" +
      "3. Enable MCP Server\\n" +
      "4. Generate and copy the token"
    );
  }

  const formatted = formatContent(content, preferences.enableTimestamp, preferences.quickCaptureTag);

  const args = [
    "append",
    `"${formatted.replace(/"/g, '\\"')}"`,
    "--api-server-token",
    preferences.apiToken,
  ];

  try {
    await executeLogseqCommand(args);
    await showToast({
      style: Toast.Style.Success,
      title: "Note added to journal",
    });
  } catch (error: any) {
    if (error.message.includes("Failed to connect")) {
      throw new Error(
        "Cannot connect to Logseq HTTP API Server.\\n\\n" +
        "Please ensure:\\n" +
        "1. Logseq is running\\n" +
        "2. MCP Server is enabled (Settings > AI)\\n" +
        "3. API token is correct"
      );
    }
    throw error;
  }
}

/**
 * Search the graph
 */
export async function searchGraph(query: string, useApiServer: boolean = false): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  const preferences = getPreferences();
  const args = ["search", `"${query.replace(/"/g, '\\"')}"`];

  if (useApiServer && preferences.apiToken) {
    args.push("--api-server-token", preferences.apiToken);
  } else {
    // Use local graph mode
    const validation = validateGraphPath(preferences.graphPath);
    if (!validation.valid) {
      throw new Error(validation.message);
    }
    const expandedPath = expandPath(preferences.graphPath);
    args.push("--graph", `"${expandedPath}"`);
  }

  args.push("--limit", "50");

  try {
    const { stdout } = await executeLogseqCommand(args);

    if (stdout.includes("Search found 0 results")) {
      return [];
    }

    // Parse search results
    // Format: "Search found N results:" followed by lines of results
    const lines = stdout.split("\\n").filter((line) => line.trim() && !line.includes("Search found"));

    return lines.map((line, index) => ({
      id: `result-${index}`,
      title: line.trim(),
      content: line.trim(),
    }));
  } catch (error: any) {
    console.error("Search error:", error);
    throw new Error(`Search failed: ${error.message}`);
  }
}

/**
 * Create a task block with properties
 */
export function formatTask(
  content: string,
  status: string = "TODO",
  priority?: string,
  deadline?: Date
): string {
  let task = `${status} ${content}`;

  if (priority) {
    task += `\\nlogseq.property/priority:: ${priority}`;
  }

  if (deadline) {
    const year = deadline.getFullYear();
    const month = String(deadline.getMonth() + 1).padStart(2, "0");
    const day = String(deadline.getDate()).padStart(2, "0");
    task += `\\nlogseq.property/deadline:: ${year}-${month}-${day}`;
  }

  return task;
}

/**
 * Add a task to the journal
 */
export async function addTask(
  content: string,
  status: string = "TODO",
  priority?: string,
  deadline?: Date
): Promise<void> {
  const taskContent = formatTask(content, status, priority, deadline);
  await appendToJournal(taskContent);
}

/**
 * Check if Logseq CLI is installed
 */
export async function checkLogseqCLI(): Promise<boolean> {
  try {
    await execAsync("logseq --version");
    return true;
  } catch {
    return false;
  }
}
