import { Button } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Link } from "@/app/components";

interface EditTaskButtonProps {
  taskId: number;
}

const EditTaskButton = ({ taskId }: EditTaskButtonProps) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/tasks/edit/${taskId}`}>Edit Task</Link>
    </Button>
  );
};

export default EditTaskButton;
