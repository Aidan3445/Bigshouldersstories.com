import { createServerFn } from "@tanstack/react-start";
import { asc, eq, isNotNull } from "drizzle-orm";
import { auth } from "./auth";
import { db } from "@/db";
import { productions } from "@/db/schema";
import { utapi } from "@/server/uploadthing";

export type EventData = {
  id: number;
  order: number;
  collaborators: Array<string> | null;
  name: string;
  description: string;
  videoUrl: string;
  imageId: string | null;
  createdAt: Date | null;
};

type EventInsert = {
  order: number;
  collaborators?: Array<string>;
  name: string;
  description: string;
  videoUrl: string;
  imageId: string;
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
    const status = await auth();
    if (status && 'error' in status) {
      throw new Error("Unauthorized");
    }

    await db
      .insert(productions)
      .values({ ...data, });
    return { success: true };
  });

export const editEvent = createServerFn({
  method: "POST",
}).inputValidator((data: Partial<EventData> & { id: number }) => data)
  .handler(async ({ data }) => {
    const status = await auth();
    if (status && 'error' in status) {
      throw new Error("Unauthorized");
    }

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
    const status = await auth();
    if (status && 'error' in status) {
      throw new Error("Unauthorized");
    }

    await db
      .delete(productions)
      .where(eq(productions.id, data.id));
    return { success: true };
  });

export const cleanUploads = createServerFn({
  method: "POST",
}).handler(async () => {
  const status = await auth();
  if (status && 'error' in status) {
    throw new Error("Unauthorized");
  }

  const usedImageIds = await db
    .select({ imageId: productions.imageId })
    .from(productions)
    .where(isNotNull(productions.imageId))
    .then((rows) => rows.map((row) => row.imageId!));

  const allImageIds: Array<string> = [];
  while (true) {
    const { files, hasMore } = await utapi.listFiles();
    allImageIds.push(...files.map((f) => f.key));
    if (!hasMore) break;
  }

  const unusedImageIds = allImageIds.filter(
    (id) => !usedImageIds.includes(id)
  );

  const { success, deletedCount } = await utapi.deleteFiles(unusedImageIds);
  return { success, deletedCount, };
});
