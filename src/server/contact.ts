import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { db } from "@/db";
import { formSubmissions } from "@/db/schema";

const getRequestIP = (): string | null => {
  const headers = getRequestHeaders();

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const remoteAddr = headers.get("x-real-ip");
  return remoteAddr ?? null;
}

export const MAX_MESSAGE_LENGTH = 5000;

export const sendContactMessage = createServerFn({
  method: "POST",
}).inputValidator((data: { name: string; email: string; message: string }) => data)
  .handler(async ({ data }) => {
    if (data.message.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters.`);
    }

    const ip = getRequestIP();

    await db
      .insert(formSubmissions)
      .values({
        name: data.name,
        email: data.email,
        message: data.message,
        ipAddress: ip
      });
    return { success: true };
  });
