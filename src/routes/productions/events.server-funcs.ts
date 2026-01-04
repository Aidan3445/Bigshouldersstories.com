import { createServerFn } from "@tanstack/react-start";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { productions } from "@/db/schema";

export type EventData = {
  id: number;
  order: number;
  collaborators: Array<string> | null;
  name: string;
  description: string;
  videoUrl: string;
  createdAt: Date | null;
};

type EventInsert = {
  order: number;
  collaborators?: Array<string>;
  name: string;
  description: string;
  videoUrl: string;
};

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
}).inputValidator((data: EventInsert) => data)
  .handler(async ({ data }) => {
    await db
      .insert(productions)
      .values({ ...data, });
    return { success: true };
  });

export const editEvent = createServerFn({
  method: "POST",
}).inputValidator((data: Partial<EventData> & { id: number }) => data)
  .handler(async ({ data }) => {
    const { id, ...updateData } = data;
    await db
      .update(productions)
      .set({ ...updateData })
      .where(eq(productions.id, id));
    return { success: true };
  });

export const deleteEvent = createServerFn({
  method: "POST",
}).inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await db
      .delete(productions)
      .where(eq(productions.id, data.id));
    return { success: true };
  });

