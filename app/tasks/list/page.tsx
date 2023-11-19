import TaskActions from "./TaskActions";
import Pagination from "@/app/components/Pagination";
import TaskTable from "./TaskTable";

import { columns } from "../../consts";

import { TaskQuery } from "@/app/types/taskQuery";

import prisma from "@/prisma/client";
import { Status } from "@prisma/client";

interface TasksPageProps {
  searchParams: TaskQuery;
}

const TasksPage = async ({
  searchParams,
}: TasksPageProps): Promise<JSX.Element> => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page: number = Number(searchParams.page) || 1;
  const pageSize: number = 10;

  const tasks = await prisma.task.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.task.count({ where });

  return (
    <div>
      <TaskActions />
      <TaskTable searchParams={searchParams} tasks={tasks} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={totalCount}
      />
    </div>
  );
};

export default TasksPage;
