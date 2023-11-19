import NextLink from "next/link";

import { Table } from "@radix-ui/themes";
import { ArrowUpIcon } from "@radix-ui/react-icons";

import { Link, StatusBadge } from "@/app/components";

import { columns } from "../../consts";

import { TaskQuery } from "@/app/types/taskQuery";

import { Task } from "@prisma/client";

interface TaskTableProps {
  searchParams: TaskQuery;
  tasks: Task[];
}

const TaskTable = ({ searchParams, tasks }: TaskTableProps): JSX.Element => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => {
            return (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tasks.map((task) => {
          return (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Link href={`/tasks/${task.id}`}>{task.title}</Link>
                <div className="block md:hidden">
                  <StatusBadge status={task.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={task.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default TaskTable;
