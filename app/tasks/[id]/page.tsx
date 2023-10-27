import { notFound } from "next/navigation";

import prisma from "@/prisma/client";

import { Box, Grid } from "@radix-ui/themes";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";

interface TaskDetailPageProps {
  params: { id: string };
}

const TaskDetailPage = async ({
  params,
}: TaskDetailPageProps): Promise<JSX.Element | never> => {
  if (isNaN(Number(params.id))) return notFound();

  const task = await prisma.task.findUnique({
    where: { id: Number(params.id) },
  });

  if (!task) return notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <TaskDetails task={task} />
      </Box>
      <Box>
        <EditTaskButton taskId={task.id} />
      </Box>
    </Grid>
  );
};

export default TaskDetailPage;
