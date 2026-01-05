import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeaders, setCookie } from "@tanstack/react-start/server";
import { eq, sql } from "drizzle-orm";
// import bcrypt from "bcrypt";
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

/*
const getCookie = (_name: string): string | null => {
  return "thisismysessioncookie"; // Placeholder for actual cookie retrieval logic
}

const setCookie = (name: string, value: string, _options: Record<string, any>): void => {
  console.log(`Set cookie: ${name}=${value}`); // Placeholder for actual cookie setting logic
}

export function auth(): void {
  const session = getCookie(SESSION_COOKIE);
  if (!session) {
    console.log("Unauthorized access attempt");
    throw new Error("Unauthorized");
  }
}
*/
export const auth = createServerFn({
  method: "GET",
}).handler(() => {
  const session = getCookie(SESSION_COOKIE);
  if (!session) {
    console.log("Unauthorized access attempt");
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
  .handler(async ({ data }): Promise<{ success: boolean; error?: string }> => {
    const ip = getRequestIP();

    if (!ip) {
      return { success: false, error: "Unable to determine IP address." };
    }

    const record = await db.query.authAttempts.findFirst({
      where: eq(authAttempts.ipAddress, ip),
    });

    if (record?.locked) {
      return { success: false, error: "Access locked. Contact administrator." };
    }

    if (record && record.attempts >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - (record.createdAt?.getTime() ?? 0);
      if (timeSinceLastAttempt < WINDOW_MS) {
        await db
          .update(authAttempts)
          .set({ locked: true })
          .where(eq(authAttempts.ipAddress, ip));
        return { success: false, error: "Too many failed attempts. Access locked." };
      } else {
        await db
          .update(authAttempts)
          .set({ attempts: 0, createdAt: new Date() })
          .where(eq(authAttempts.ipAddress, ip));
      }
    }

    // const passwordHash = process.env.ADMIN_PASSWORD_HASH!;
    // const isValid = await bcrypt.compare(data.password, passwordHash);
    const isValid = data.password === process.env.TOP_SECRET_PASSWORD;

    if (!isValid) {
      console.log(`Failed login attempt from IP: ${ip}, Password: ${data.password}`);
      try {
        const insert = await db
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
        console.log('Auth attempt record:', insert);
      } catch (error) {
        console.error('Error logging auth attempt:', error);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const finalAttempt = record && record.attempts + 1 === MAX_ATTEMPTS;
      return {
        success: false,
        error: finalAttempt
          ? "One more failed attempt will lock access."
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
