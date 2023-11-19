import Link from "next/link";

import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";

import StatusBadge from "../components/StatusBadge";

import prisma from "@/prisma/client";

const LatestTasks = async (): Promise<JSX.Element> => {
  const latestTasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest tasks
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestTasks.map((task) => {
            return (
              <Table.Row key={task.id}>
                <Table.Cell>
                  <Flex justify="between">
                    <Flex direction="column" align="stretch" gap="2">
                      <Link href={`/tasks/${task.id}`}>{task.title}</Link>
                      <StatusBadge status={task.status} />
                    </Flex>
                    {task.assignedToUser && (
                      <Avatar
                        src={task.assignedToUser.image!}
                        fallback="?"
                        size="2"
                        radius="full"
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestTasks;
