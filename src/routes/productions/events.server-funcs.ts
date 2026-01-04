import { createServerFn } from "@tanstack/react-start";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { productions } from "@/db/schema";

export const getEventsData = createServerFn({
  method: "GET",
}).handler(async () => {
  return await db
    .query.productions
    .findMany({
      orderBy: [asc(productions.order)],
    });
});

export const createEvent = createServerFn({
  method: "POST",
}).inputValidator((data: {
  name: string;
  description: string;
  videoUrl: string;
  order: number;
}) => data).handler(async ({ data }) => {
  await db
    .insert(productions)
    .values({ ...data, });
  return { success: true };
});

export const editEvent = createServerFn({
  method: "POST",
}).inputValidator((data: {
  id: number;
  name?: string;
  description?: string;
  videoUrl?: string;
  order?: number;
}) => data).handler(async ({ data }) => {
  const { id, ...updateData } = data;
  await db
    .update(productions)
    .set({ ...updateData })
    .where(eq(productions.id, id));
  return { success: true };
});

export const deleteEvent = createServerFn({
  method: "POST",
}).inputValidator((data: { id: number }) => data).handler(async ({ data }) => {
  await db
    .delete(productions)
    .where(eq(productions.id, data.id));
  return { success: true };
});

