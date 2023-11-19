import Link from "next/link";

import { Card, Flex, Text } from "@radix-ui/themes";

import { StatusType } from "../types/status";

export interface SummaryProps {
  toDo: number;
  inProgress: number;
  done: number;
}

const TaskSummary = ({ toDo, inProgress, done }: SummaryProps): JSX.Element => {
  const statuses: StatusType[] = [
    { label: "ToDo", value: toDo, status: "TO_DO" },
    { label: "InProgress", value: inProgress, status: "IN_PROGRESS" },
    { label: "DOne", value: done, status: "DONE" },
  ];

  return (
    <Flex gap="4">
      {statuses.map((status) => {
        return (
          <Card key={status.value}>
            <Flex direction="column" gap="1">
              <Link
                className="text-sm font-medium"
                href={`/tasks/list?status=${status.status}`}
              >
                {status.label}
              </Link>
            </Flex>
            <Text size="5" className="font-bold">
              {status.value}
            </Text>
          </Card>
        );
      })}
    </Flex>
  );
};

export default TaskSummary;
