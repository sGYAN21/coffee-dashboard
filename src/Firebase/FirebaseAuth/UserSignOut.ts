import { signOut } from "firebase/auth";
import { auth } from "../client";


export const UserSignOut = async (): Promise<boolean> => {
  try {
    await signOut(auth);
    
    sessionStorage.clear();
    localStorage.clear(); 

    return true;
  } catch (err: any) {
    console.error("Logout Error:", err.message);
    throw new Error(err.message || "Failed to log out");
  }
};