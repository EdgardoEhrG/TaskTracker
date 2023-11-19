import { Badge } from "@radix-ui/themes";

import { statusMap } from "../consts";

import { Status } from "@prisma/client";

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge = ({ status }: StatusBadgeProps): JSX.Element => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default StatusBadge;
