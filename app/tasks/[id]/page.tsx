import { notFound } from "next/navigation";

import prisma from "@/prisma/client";

import { Box, Flex, Grid } from "@radix-ui/themes";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";
import DeleteTaskButton from "./DeleteTaskButton";
import AssigneeSelect from "./AssigneeSelect";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <TaskDetails task={task} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect task={task} />
          <EditTaskButton taskId={task.id} />
          <DeleteTaskButton taskId={task.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default TaskDetailPage;
