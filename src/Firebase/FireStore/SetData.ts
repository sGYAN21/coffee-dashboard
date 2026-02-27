import {addDoc, collection,doc,setDoc, type DocumentData, type DocumentReference, type CollectionReference } from "firebase/firestore";
import { db } from "../firebase";


export const createDocument = async <T extends DocumentData>(collectionName: string,docId:string, data: T):Promise<void>=>{

    try{
        await setDoc(doc(db, collectionName, docId),{...data})
    }catch(error)
    {
        console.error("Creating doucment error", error);
        throw error;
    }

}

export const addDocument = async <T extends DocumentData>(
  collectionName: string, 
  data: T
): Promise<DocumentReference<T> | void> => {
  try {
    return await addDoc(collection(db, collectionName) as CollectionReference<T>, {
      ...data,
    });
  } catch (err) {
    console.error("Error adding document:", err);
    throw err;
  }
};