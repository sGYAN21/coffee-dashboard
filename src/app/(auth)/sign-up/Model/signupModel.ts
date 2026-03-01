import { emailPasswordSignUp } from "@/Firebase/FirebaseAuth/UserSignUp";
import { createDocument } from "@/Firebase/FireStore/SetData";


export const signUpUser = async (username: string,email: string, password: string,role: 'admin' | 'customer') => {
const normalizedEmail = email.trim().toLowerCase();
    const response = await emailPasswordSignUp(username,email, password);

      if (typeof response === "string") {
    // Pass error message back up
    throw new Error(response);
  }
  const userData={
    
    uid: response.uid,
    username,
    email: normalizedEmail,
    role: role,
    createdAt: new Date(),
    lastLogin: new Date(),
  }
  await createDocument("admin", response.uid, userData);

  localStorage.setItem(
    "userInfo",
    JSON.stringify({ email: normalizedEmail, uid: response.uid, username })
  );

    return response;
}