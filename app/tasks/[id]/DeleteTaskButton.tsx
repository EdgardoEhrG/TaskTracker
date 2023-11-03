"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";

import axios from "axios";
import { Spinner } from "@/app/components";

interface DeleteTaskButtonProps {
  taskId: number;
}

const DeleteTaskButton = ({ taskId }: DeleteTaskButtonProps) => {
  const router = useRouter();

  const [error, setError] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/tasks/${taskId}`);
      router.push("/tasks/list");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Task</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are U Sure U Want To Delete This Task?
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button disabled={isDeleting} onClick={handleDelete} color="red">
                Delete Task
                {isDeleting && <Spinner />}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            {`This Task Can't Be Deleted`}
          </AlertDialog.Description>
          <Button
            variant="soft"
            color="gray"
            mt="2"
            onClick={() => {
              setError(false);
            }}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteTaskButton;
