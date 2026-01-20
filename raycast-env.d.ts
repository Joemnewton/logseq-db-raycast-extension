/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Graph Path - Full path to your Logseq DB graph (e.g., ~/logseq/graphs/my-graph) */
  "graphPath": string,
  /** API Server Token - Optional: API token for HTTP server (Settings > AI > MCP Server in Logseq) */
  "apiToken"?: string,
  /** Enable Timestamp - Prepend notes with current time */
  "enableTimestamp": boolean,
  /** Quick Capture Tag - Optional tag to add to quick captures (without #) */
  "quickCaptureTag"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `quick-capture` command */
  export type QuickCapture = ExtensionPreferences & {}
  /** Preferences accessible in the `search` command */
  export type Search = ExtensionPreferences & {}
  /** Preferences accessible in the `add-task` command */
  export type AddTask = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `quick-capture` command */
  export type QuickCapture = {}
  /** Arguments passed to the `search` command */
  export type Search = {}
  /** Arguments passed to the `add-task` command */
  export type AddTask = {}
}

