import { notFound } from "next/navigation";

import { Box, Flex, Grid } from "@radix-ui/themes";

import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";
import DeleteTaskButton from "./DeleteTaskButton";
import AssigneeSelect from "./AssigneeSelect";

import { fetchUser } from "@/app/helpers";

interface TaskDetailPageProps {
  params: { id: string };
}

const TaskDetailPage = async ({
  params,
}: TaskDetailPageProps): Promise<JSX.Element | never> => {
  if (isNaN(Number(params.id))) return notFound();

  const task = await fetchUser(Number(params.id));

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

export async function generateMetadata({ params }: TaskDetailPageProps) {
  const task = await fetchUser(Number(params.id));
  return {
    title: task?.title,
    description: `Details of task ${task?.id}`,
  };
}

export default TaskDetailPage;
