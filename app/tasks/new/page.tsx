"use client";

import "easymde/dist/easymde.min.css";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TaskForm {
  title: string;
  description: string;
}

const NewTaskPage = () => {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<TaskForm>();

  return (
    <form className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button
        onClick={handleSubmit(async (data) => {
          await axios.post("/api/tasks", data);
          router.push("/tasks");
        })}
      >
        Create new task
      </Button>
    </form>
  );
};

export default NewTaskPage;
