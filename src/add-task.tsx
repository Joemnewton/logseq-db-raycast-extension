import { Form, ActionPanel, Action, showToast, Toast, closeMainWindow } from "@raycast/api";
import React, { useState } from "react";
import { addTask, checkLogseqCLI } from "./utils";

const STATUS_OPTIONS = [
  { title: "TODO", value: "TODO" },
  { title: "DOING", value: "DOING" },
  { title: "DONE", value: "DONE" },
  { title: "WAITING", value: "WAITING" },
  { title: "LATER", value: "LATER" },
  { title: "NOW", value: "NOW" },
];

const PRIORITY_OPTIONS = [
  { title: "None", value: "" },
  { title: "A (Highest)", value: "A" },
  { title: "B (High)", value: "B" },
  { title: "C (Medium)", value: "C" },
];

export default function AddTask() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("TODO");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Task content is required",
        message: "Please enter task description",
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

      await addTask(
        content,
        status,
        priority || undefined,
        deadline || undefined
      );
      await closeMainWindow();
    } catch (error: any) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to add task",
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
          <Action.SubmitForm title="Add Task" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="content"
        title="Task"
        placeholder="Enter task description..."
        value={content}
        onChange={setContent}
        autoFocus
      />

      <Form.Dropdown
        id="status"
        title="Status"
        value={status}
        onChange={setStatus}
      >
        {STATUS_OPTIONS.map((option) => (
          <Form.Dropdown.Item
            key={option.value}
            value={option.value}
            title={option.title}
          />
        ))}
      </Form.Dropdown>

      <Form.Dropdown
        id="priority"
        title="Priority"
        value={priority}
        onChange={setPriority}
      >
        {PRIORITY_OPTIONS.map((option) => (
          <Form.Dropdown.Item
            key={option.value}
            value={option.value}
            title={option.title}
          />
        ))}
      </Form.Dropdown>

      <Form.DatePicker
        id="deadline"
        title="Deadline"
        value={deadline}
        onChange={setDeadline}
      />

      <Form.Description text="This task will be added to today's journal in Logseq" />
    </Form>
  );
}
