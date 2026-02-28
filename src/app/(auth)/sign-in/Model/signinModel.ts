
import {doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/Firebase/client';
import { createSession } from '@/lib/actions/auth.action';


export const signInUser = async (email: string, password: string)=>{
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    const user = userCredential.user

    const idToken = await user.getIdToken();

    const userDoc = await getDoc (doc(db,'users', user.uid));

    if(!userDoc.exists()){
        throw new Error ("User profile not found.");
    }

    const userData = userDoc.data();
await createSession(idToken);
      return {
    user: {
      uid: user.uid,
      email: user.email,
    },
    role : userData.role
};
}