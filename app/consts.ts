import { Column, StatusElement } from "./types/status";

import { Status } from "@prisma/client";

export const tableHeaders: string[] = ["Task", "Status", "Created"];

export const idxs: number[] = [1, 2, 3, 4, 5];

export const statuses: StatusElement[] = [
  { label: "All" },
  { label: "ToDo", value: "TO_DO" },
  { label: "InProgress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];

export const columns: Column[] = [
  { label: "Task", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const statusMap: Record<
  Status,
  { label: string; color: "red" | "blue" | "violet" | "green" | "orange" }
> = {
  TO_DO: { label: "To Do", color: "orange" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  DONE: { label: "Done", color: "green" },
};
