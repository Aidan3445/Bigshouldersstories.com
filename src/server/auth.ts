import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeaders, setCookie } from "@tanstack/react-start/server";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { authAttempts } from "@/db/schema";

const MAX_ATTEMPTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const SESSION_COOKIE = "admin_session";
const SESSION_DURATION = 60 * 60 * 24; // 24 hours

const getRequestIP = (): string | null => {
  const headers = getRequestHeaders();

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const remoteAddr = headers.get("x-real-ip");
  return remoteAddr ?? null;
}

export const auth = createServerFn({
  method: "GET",
}).handler(() => {
  const session = getCookie(SESSION_COOKIE);
  if (!session) {
    return { error: "Unauthorized" };
  }
});

export const getAuthStatus = createServerFn({
  method: "GET",
}).handler(async () => {
  const ip = getRequestIP();

  if (!ip) {
    return { authenticated: false, locked: true, attempts: 0 };
  }

  const record = await db.query.authAttempts.findFirst({
    where: eq(authAttempts.ipAddress, ip),
  });

  const isAuthenticated = !!getCookie(SESSION_COOKIE);

  return {
    authenticated: isAuthenticated,
    locked: record?.locked ?? false,
    attempts: record?.attempts ?? 0,
  };
});

export const login = createServerFn({
  method: "POST",
})
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }): Promise<{ success: boolean; error?: string, redirectTo?: string }> => {
    const ip = getRequestIP();

    if (!ip) {
      return { success: false, error: "Unable to determine IP address." };
    }

    const record = await db.query.authAttempts.findFirst({
      where: eq(authAttempts.ipAddress, ip),
    });

    if (record?.locked) {
      return {
        success: false,
        error: "Access locked. Contact administrator.",
        redirectTo: '/productions'
      };
    }

    if (record && record.attempts >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - (record.createdAt.getTime());
      if (timeSinceLastAttempt < WINDOW_MS) {
        await db
          .update(authAttempts)
          .set({ locked: true, entry: data.password })
          .where(eq(authAttempts.ipAddress, ip));
        return {
          success: false,
          error: "Too many failed attempts. Access locked.",
          redirectTo: '/productions'
        };
      } else {
        await db
          .update(authAttempts)
          .set({ attempts: 0, entry: data.password, createdAt: new Date() })
          .where(eq(authAttempts.ipAddress, ip));
      }
    }

    const passwordHash = process.env.TOP_SECRET_HASH!;
    const isValid = await bcrypt.compare(data.password, passwordHash);
    console.log(`Login attempt from IP ${ip}: ${isValid ? "SUCCESS" : "FAILURE"}`);
    console.log({
      envHash: passwordHash,
      providedPassword: data.password,
    });

    if (!isValid) {
      const [updatedRecord] = await db
        .insert(authAttempts)
        .values({ ipAddress: ip, entry: data.password, attempts: 1, createdAt: new Date() })
        .onConflictDoUpdate({
          target: authAttempts.ipAddress,
          set: {
            attempts: sql`${authAttempts.attempts} + 1`,
            entry: data.password,
          },
        })
        .returning();

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const finalAttempt = updatedRecord.attempts >= MAX_ATTEMPTS;
      const timeSinceFirstAttempt = new Date(updatedRecord.createdAt.getTime() + WINDOW_MS)
      return {
        success: false,
        error: finalAttempt
          ? `One more failed attempt before ${timeSinceFirstAttempt.toLocaleTimeString()} will lock access.`
          : "Invalid password."
      };
    }

    // Clear failed attempts
    if (record) {
      await db.delete(authAttempts).where(eq(authAttempts.ipAddress, ip));
    }

    // Set session cookie
    setCookie(SESSION_COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION,
      path: "/",
    });

    return { success: true };
  });

export const logout = createServerFn({
  method: "POST",
}).handler(() => {
  setCookie(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return { success: true };
});
