import Link from "next/link";

import { Button } from "@radix-ui/themes";

const TasksPage = (): JSX.Element => {
  return (
    <div>
      <Button>
        <Link href="/tasks/new">New Task</Link>
      </Button>
    </div>
  );
};

export default TasksPage;
