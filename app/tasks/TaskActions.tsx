import Link from "next/link";
import { Button } from "@radix-ui/themes";

const TaskActions = (): JSX.Element => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/tasks/new">New Task</Link>
      </Button>
    </div>
  );
};

export default TaskActions;