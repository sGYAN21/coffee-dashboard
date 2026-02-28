import {
  sendPasswordResetEmail,
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../client";

/**
 * Sends a password reset link to the user's email.
 * This is used when the user is NOT logged in.
 */
export const UserForgotPassword = async (mail: string): Promise<void> => {
  try {
    // sendPasswordResetEmail returns void on success
    await sendPasswordResetEmail(auth, mail);
  } catch (err: any) {
    const errorMessage = err.code ? `Firebase: ${err.code}` : err.message;
    throw new Error(errorMessage || "Failed to send reset email");
  }
};

/**
 * Changes the password for a user who is CURRENTLY logged in.
 * Firebase requires re-authentication for sensitive operations like this.
 */
export const ChangePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("No authenticated user found. Please log in again.");
  }

  try {
    // 1. Create credential for re-authentication
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    // 2. Re-authenticate the user (Required by Firebase for security)
    await reauthenticateWithCredential(user, credential);

    // 3. Update to the new password
    await updatePassword(user, newPassword);
  } catch (err: any) {
    // Standardizing the error message for your UI components
    const errorMessage = err.code === 'auth/wrong-password' 
      ? "The current password you entered is incorrect." 
      : (err.message || "Failed to update password");
      
    throw new Error(errorMessage);
  }
};