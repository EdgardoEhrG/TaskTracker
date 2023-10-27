"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import "easymde/dist/easymde.min.css";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { ErrorMessage, Spinner } from "@/app/components";

import { createTaskSchema } from "@/app/api/tasks/validation";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type TaskForm = z.infer<typeof createTaskSchema>;

const NewTaskPage = (): JSX.Element => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(createTaskSchema),
  });

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/tasks", data);
      router.push("/tasks");
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
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isLoading} onClick={onSubmit}>
          Create new task {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewTaskPage;
