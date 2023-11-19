import { Status, Task } from "@prisma/client";

export type TaskQuery = { status: Status; orderBy: keyof Task; page: string };
