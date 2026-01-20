import { List, ActionPanel, Action, showToast, Toast, Icon } from "@raycast/api";
import React, { useState, useEffect } from "react";
import { searchGraph, checkLogseqCLI, getPreferences, SearchResult } from "./utils";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const preferences = getPreferences();

  useEffect(() => {
    async function performSearch() {
      if (!searchText.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      try {
        // Check if CLI is installed
        const cliInstalled = await checkLogseqCLI();
        if (!cliInstalled) {
          await showToast({
            style: Toast.Style.Failure,
            title: "Logseq CLI not found",
            message: "Please install @logseq/cli: npm install -g @logseq/cli",
          });
          setIsLoading(false);
          return;
        }

        const searchResults = await searchGraph(searchText, !!preferences.apiToken);
        setResults(searchResults);
      } catch (error: any) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Search failed",
          message: error.message,
        });
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchText]);

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search your Logseq graph..."
      throttle
    >
      {results.length === 0 && searchText.trim() !== "" && !isLoading ? (
        <List.EmptyView
          icon={Icon.MagnifyingGlass}
          title="No results found"
          description={`No matches for "${searchText}"`}
        />
      ) : null}

      {results.length === 0 && searchText.trim() === "" ? (
        <List.EmptyView
          icon={Icon.Book}
          title="Search your Logseq graph"
          description="Type to start searching..."
        />
      ) : null}

      {results.map((result) => (
        <List.Item
          key={result.id}
          title={result.title}
          subtitle={result.content !== result.title ? result.content : undefined}
          icon={Icon.Document}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                title="Copy Content"
                content={result.content}
                shortcut={{ modifiers: ["cmd"], key: "c" }}
              />
              <Action.CopyToClipboard
                title="Copy as Markdown Link"
                content={`[[${result.title}]]`}
                shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
