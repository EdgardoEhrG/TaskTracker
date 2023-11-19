import { cache } from "react";

import prisma from "@/prisma/client";

export const fetchUser = cache((taskId: number) => {
  return prisma.task.findUnique({
    where: { id: taskId },
  });
});
