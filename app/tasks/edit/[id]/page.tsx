import SkeletonForm from "@/app/components/SkeletonForm";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const TaskForm = dynamic(() => import("@/app/components/TaskForm"), {
  ssr: false,
  loading: () => <SkeletonForm />,
});

interface EditTaskPageProps {
  params: { id: string };
}

const EditTaskPage = async ({ params: { id } }: EditTaskPageProps) => {
  const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });

  if (!task) notFound();

  return <TaskForm task={task} />;
};

export default EditTaskPage;
