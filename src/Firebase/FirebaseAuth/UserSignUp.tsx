import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

type SignUpResponse = {
  uid: string;
  email: string | null;
};

export const emailPasswordSignUp = async (
  username: string,
  mail: string,
  pass: string
): Promise<SignUpResponse> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, mail, pass); 

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: username });
    }

    return {
      uid: res.user.uid,
      email: res.user.email,
    };
  } catch (err: any) {
    // IMPORTANT: throw error, don’t return it
    throw new Error(err.message || "Signup failed");
  }
};

export const updateName = async (nameOne: string, nameTwo?: string) => {
  if (!auth.currentUser) throw new Error("No authenticated user");
  const res = await updateProfile(auth.currentUser, {
    displayName: nameOne || nameTwo,
  });

  return res;
};
