import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../client";

/**
 * Log in users using Email and Password.
 * Returns the UserCredential object on success or throws an error on failure.
 */
export const emailPasswordLogin = async (
  mail: string, 
  pass: string
): Promise<UserCredential> => {
  try {
    // 1. Await the sign-in result
    const userCredential = await signInWithEmailAndPassword(auth, mail, pass);
    
    // 2. Return the full credential object (contains user info, tokens, etc.)
    return userCredential;
  } catch (err: any) {
    // 3. Handle specific Firebase errors or throw a generic one
    const errorMessage = err.code ? `Auth Error: ${err.code}` : err.message;
    console.error("Login failed:", errorMessage);
    
    throw new Error(errorMessage || "Login failed");
  }
};