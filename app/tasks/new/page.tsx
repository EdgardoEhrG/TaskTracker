import dynamic from "next/dynamic";

import SkeletonForm from "@/app/components/SkeletonForm";

const TaskForm = dynamic(() => import("@/app/components/TaskForm"), {
  ssr: false,
  loading: () => <SkeletonForm />,
});

const NewTaskPage = () => {
  return <TaskForm />;
};

export default NewTaskPage;
