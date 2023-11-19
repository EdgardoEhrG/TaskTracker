import { Status, Task } from "@prisma/client";

export type StatusElement = {
  label: string;
  value?: Status;
};

export type Column = {
  label: string;
  value: keyof Task;
  className?: string;
};

export type StatusType = {
  label: string;
  value: number;
  status: Status;
};
