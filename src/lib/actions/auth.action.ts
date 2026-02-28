"use server";
import { adminAuth } from "@/Firebase/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSession(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 days

  try {
      const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
  
  const cookieStore = await cookies();
  cookieStore.set("session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
    
  } catch (error) {
    console.error("Failed to create session cookie:", error);
    throw new Error("Authentication failed at the session level.");
  }

}

export async function signOut() {
  const cookieStore = await cookies();
  
  // Delete the session cookie
  cookieStore.delete("session");
  
  // Redirect to login page
  redirect("/sign-in");
}