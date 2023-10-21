import { Status } from "@prisma/client";

import { Badge } from "@radix-ui/themes";

interface StatusBadgeProps {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "blue" | "violet" | "green" | "orange" }
> = {
  TO_DO: { label: "To Do", color: "orange" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  DONE: { label: "Done", color: "green" },
};

const StatusBadge = ({ status }: StatusBadgeProps): JSX.Element => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default StatusBadge;
