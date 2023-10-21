import { Table } from "@radix-ui/themes";
import StatusBadge from "../components/StatusBadge";
import Link from "../components/Link";
import TaskActions from "./TaskActions";

import { tableHeaders } from "./consts";

import prisma from "@/prisma/client";

import classNames from "classnames";
import delay from "delay";

const TasksPage = async (): Promise<JSX.Element> => {
  const tasks = await prisma.task.findMany();

  await delay(2000);

  return (
    <div>
      <TaskActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {tableHeaders.map((header, idx) => {
              return (
                <Table.ColumnHeaderCell
                  key={idx}
                  className={classNames({
                    "hidden md:table-cell":
                      header === "Status" || header === "Created",
                  })}
                >
                  {header}
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
    </div>
  );
};

export default TasksPage;
