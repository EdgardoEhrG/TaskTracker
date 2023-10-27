import { Button, Link } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface EditTaskButtonProps {
  taskId: number;
}

const EditTaskButton = ({ taskId }: EditTaskButtonProps) => {
  return (
    <Button>
      <Link href={`/tasks/${taskId}/edit`}>
        <Pencil2Icon /> EDit Task
      </Link>
    </Button>
  );
};

export default EditTaskButton;
