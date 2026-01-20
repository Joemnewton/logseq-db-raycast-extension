import { Form, ActionPanel, Action, showToast, Toast, closeMainWindow } from "@raycast/api";
import React, { useState } from "react";
import { appendToJournal, checkLogseqCLI } from "./utils";

export default function QuickCapture() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Content is required",
        message: "Please enter some content for your note",
      });
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

      await appendToJournal(content);
      await closeMainWindow();
    } catch (error: any) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to add note",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add to Journal" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="content"
        title="Note"
        placeholder="Enter your note..."
        value={content}
        onChange={setContent}
        autoFocus
      />
      <Form.Description text="This note will be added to today's journal in Logseq" />
    </Form>
  );
}
