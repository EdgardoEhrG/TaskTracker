import { NextRequest, NextResponse } from "next/server";
import { taskSchema } from "../validation";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = taskSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task)
    return NextResponse.json({ error: "Invalid task" }, { status: 404 });

  const updatedTask = await prisma.task.update({
    where: { id: task.id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedTask);
}
