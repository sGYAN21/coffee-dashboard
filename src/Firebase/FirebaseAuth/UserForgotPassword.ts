import {
  sendPasswordResetEmail,
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../client";


export const UserForgotPassword = async (mail: string): Promise<void> => {
  try {
    // sendPasswordResetEmail returns void on success
    await sendPasswordResetEmail(auth, mail);
  } catch (err: any) {
    const errorMessage = err.code ? `Firebase: ${err.code}` : err.message;
    throw new Error(errorMessage || "Failed to send reset email");
  }
};


export const ChangePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("No authenticated user found. Please log in again.");
  }

  try {

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);
  } catch (err: any) {
    const errorMessage = err.code === 'auth/wrong-password' 
      ? "The current password you entered is incorrect." 
      : (err.message || "Failed to update password");
      
    throw new Error(errorMessage);
  }
};