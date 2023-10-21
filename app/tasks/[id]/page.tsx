import { notFound } from "next/navigation";

import prisma from "@/prisma/client";

import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import StatusBadge from "@/app/components/StatusBadge";
import ReactMarkdown from "react-markdown";

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
    <div>
      <Heading>{task.title}</Heading>
      <Flex gap="3" my="4">
        <StatusBadge status={task.status} />
        <Text>
          Created at: <i>{task.createdAt.toDateString()}</i>
        </Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{task.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default TaskDetailPage;
