import { Metadata } from "next";

import { Flex, Grid } from "@radix-ui/themes";

import TaskChart from "./components/TaskChart";
import TaskSummary from "./components/TaskSummary";
import LatestTasks from "./components/LatestTasks";

import prisma from "@/prisma/client";

export default async function Home(): Promise<JSX.Element> {
  const toDOCount = await prisma.task.count({ where: { status: "TO_DO" } });
  const inProgressCount = await prisma.task.count({
    where: { status: "IN_PROGRESS" },
  });
  const doneCount = await prisma.task.count({ where: { status: "DONE" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <TaskSummary
          toDo={toDOCount}
          inProgress={inProgressCount}
          done={doneCount}
        />
        <TaskChart
          toDo={toDOCount}
          inProgress={inProgressCount}
          done={doneCount}
        />
      </Flex>
      <LatestTasks />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Task Tracker",
  description: "View a summary of project tasks",
};
