import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/Firebase/firebase';
import { deleteImage, UploadImage } from '@/Firebase/FireStore/UploadImage';

export interface ProductMap {
  small: string;
  medium: string;
  large: string;
}

export interface ProductData {
  name: string;
  description: string;
  category: string;
  type: string;
  imageFile: File;
  price: ProductMap;
  volume: ProductMap;
}


export const uploadProductItem = async (data: ProductData) => {
  try {
    // 1. Upload the image first to get the URL
    const imageUrl = await UploadImage(data.imageFile);

    // 2. Prepare the final document structure
    const productDoc = {
      name: data.name,
      description: data.description,
      category: data.category,
      type: data.type.toLowerCase(),
      image: imageUrl,
      price: data.price,
      volume: data.volume,
      createdAt: serverTimestamp(),
    };


    const collectionPath = `products/${data.type.toLowerCase()}/items`;

    // 4. Save to Firestore
    const docRef = await addDoc(collection(db, collectionPath), productDoc);

    return docRef.id;
  } catch (error) {
    console.error("Firestore Upload Error:", error);
    throw error;
  }
};
export const updateProductItem = async (path: string, data: ProductData, oldImageUrl: string) => {
  try {
    let finalImageUrl = oldImageUrl;

    // 1. Only upload a new image if the user selected one
    if (data.imageFile) {
      finalImageUrl = await UploadImage(data.imageFile);

      if (oldImageUrl) {
        await deleteImage(oldImageUrl);
      }
    }

    const docRef = doc(db, path);

    // 3. Update Firestore
    await updateDoc(docRef, {
      name: data.name,
      description: data.description,
      category: data.category,
      type: data.type.toLowerCase(),
      image: finalImageUrl,
      price: data.price,
      volume: data.volume,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Firestore Update Error:", error);
    throw error;
  }
};