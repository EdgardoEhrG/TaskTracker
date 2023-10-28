import TaskForm from "@/app/components/TaskForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface EditTaskPageProps {
  params: { id: string };
}

const EditTaskPage = async ({ params: { id } }: EditTaskPageProps) => {
  const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });

  if (!task) notFound();

  return <TaskForm task={task} />;
};

export default EditTaskPage;
