import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

import { storage } from "../client";

export const UploadImage = async (imageFile:File)=>{

const fileName = `${Date.now()}_${imageFile.name}`;
    const storageRef = ref(storage, `products/${fileName}`);
    const upload = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(upload.ref);
    console.log(downloadURL);
    

    return downloadURL;
    
}

export const deleteImage = async (imageUrl: string) => {
    if (!imageUrl || imageUrl.includes('via.placeholder')) return;
  try{
  const storageRef = ref(storage, imageUrl);
  await deleteObject(storageRef);
  return true;
  }catch(err){
    console.error("Delete failed:", err);
    return false;

  }
    
};