import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/Firebase/client';

export const resetUserPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        throw new Error(error.message || "Failed to send password reset email.");
    }
}
