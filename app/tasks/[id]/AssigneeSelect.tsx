"use client";

import { Task, User } from "@prisma/client";

import { Select } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast/headless";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface AssigneeSelectProps {
  task: Task;
}

const AssigneeSelect = ({ task }: AssigneeSelectProps): JSX.Element | null => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const handleAssign = async (userId: string) => {
    axios
      .patch(`/api/tasks/${task.id}`, {
        assignedToUserId: userId || null,
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={task.assignedToUserId || ""}
        onValueChange={handleAssign}
      >
        <Select.Trigger placeholder="Assign..."></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            <Select.Item value="1">Tom</Select.Item>
            {/* {users.map((user) => {
          return (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          );
        })} */}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => {
      return axios.get(`/api/users`).then((res) => res.data);
    },
    staleTime: 60 * 1000,
    retry: 3,
  });
};

export default AssigneeSelect;
