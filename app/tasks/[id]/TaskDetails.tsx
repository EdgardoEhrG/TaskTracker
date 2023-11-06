import { Task } from "@prisma/client";

import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import { StatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";

interface TaskDetailsProps {
  task: Task;
}

const TaskDetails = ({ task }: TaskDetailsProps): JSX.Element => {
  return (
    <>
      <Heading>{task.title}</Heading>
      <Flex gap="3" my="4">
        <StatusBadge status={task.status} />
        <Text>
          Created at: <i>{task.createdAt.toDateString()}</i>
        </Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{task.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TaskDetails;
