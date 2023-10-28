import { Button } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Link } from "@/app/components";

interface EditTaskButtonProps {
  taskId: number;
}

const EditTaskButton = ({ taskId }: EditTaskButtonProps) => {
  return (
    <div>
      <Button>
        <Pencil2Icon />
        <Link href={`/tasks/${taskId}/edit`}>Edit Task</Link>
      </Button>
    </div>
  );
};

export default EditTaskButton;
