import { UserForgotPassword } from "@/Firebase/FirebaseAuth/UserForgotPassword";


export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await UserForgotPassword(email.trim());
  } catch (error: any) {
    throw error;
  }
};