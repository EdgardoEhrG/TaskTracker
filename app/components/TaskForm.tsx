"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import "easymde/dist/easymde.min.css";

import { Button, Callout, TextField } from "@radix-ui/themes";

import SimpleMDE from "react-simplemde-editor";

import { ErrorMessage, Spinner } from "@/app/components";

import { taskSchema } from "@/app/api/tasks/validation";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { z } from "zod";

import { Task } from "@prisma/client";

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  task?: Task;
}

const TaskForm = ({ task }: TaskFormProps): JSX.Element => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      if (task) {
        await axios.patch(`/api/tasks/${task.id}`, data);
      } else {
        await axios.post("/api/tasks", data);
      }

      router.push("/tasks/list");
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      setError("An unexpected error occured.");
      console.log(error);
    }
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3">
        <TextField.Root>
          <TextField.Input
            defaultValue={task?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={task?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isLoading} onClick={onSubmit}>
          {task ? "Update task" : "Create new task"} {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
