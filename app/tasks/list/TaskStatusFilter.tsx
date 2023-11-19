"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Select } from "@radix-ui/themes";

import { statuses } from "../../consts";

const TaskStatusFilter = (): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatus = (status: string) => {
    const params = new URLSearchParams();

    if (status) params.append("status", status);

    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);

    const query = params.size ? "?" + params.toString() : "";

    router.push("/tasks/list/" + query);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        handleStatus(status);
      }}
    >
      <Select.Trigger placeholder="Filter by status">
        <Select.Content>
          {statuses.map((status) => {
            return (
              <Select.Item key={status.value} value={status.value || ""}>
                {status.label}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Trigger>
    </Select.Root>
  );
};

export default TaskStatusFilter;
