import Link from "next/link";

import { Button, Table } from "@radix-ui/themes";

import prisma from "@/prisma/client";
import classNames from "classnames";

const TasksPage = async (): Promise<JSX.Element> => {
  const tasks = await prisma.task.findMany();

  const tableHeaders: string[] = ["Task", "Status", "Created"];

  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/tasks/new">New Task</Link>
        </Button>
      </div>

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
                  {task.title}{" "}
                  <span className="block md:hidden">{task.status}</span>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {task.status}
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
