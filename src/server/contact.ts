import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { count, eq, or } from "drizzle-orm";
import { Resend } from "resend";
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

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactMessage = createServerFn({
  method: "POST",
}).inputValidator((data: { name: string; email: string; message: string }) => data)
  .handler(async ({ data }) => {
    const ip = getRequestIP();
    if (!ip) {
      console.error("IP address could not be determined.", { data });
      throw new Error("Unable to determine IP address.");
    }

    if (data.message.length > MAX_MESSAGE_LENGTH) {
      console.error("Message exceeds maximum length.", {
        length: data.message.length,
        max: MAX_MESSAGE_LENGTH,
        ip,
        data
      });
      throw new Error(`Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters.`);
    }

    const messagesSentFromIP = await db
      .select({ count: count() })
      .from(formSubmissions)
      .where(or(
        eq(formSubmissions.ipAddress, ip),
        eq(formSubmissions.email, data.email)
      ));

    if (messagesSentFromIP[0].count >= 10) {
      console.error("IP address or email has exceeded message submission limit.", { ip, data });
      throw new Error("Sorry, you cant submit any more messages at this time.");
    }

    await db
      .insert(formSubmissions)
      .values({
        name: data.name,
        email: data.email,
        message: data.message,
        ipAddress: ip
      });

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `${data.name} shared their story!`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      replyTo: data.email,
    });

    return { success: true };
  });
