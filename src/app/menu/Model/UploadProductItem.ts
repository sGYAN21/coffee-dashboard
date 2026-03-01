// import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
// import { db } from '@/Firebase/client';
// import { deleteImage, UploadImage } from '@/Firebase/FireStore/UploadImage';

// export interface ProductMap {
//   small: string;
//   medium: string;
//   large: string;
// }

// export interface ProductData {
//   name: string;
//   description: string;
//   category: string;
//   type: string;
//   imageFile: File;
//   price: ProductMap;
//   volume: ProductMap;
// }


// export const uploadProductItem = async (data: ProductData) => {
//   try {
//     // 1. Upload the image first to get the URL
//     const imageUrl = await UploadImage(data.imageFile);

//     // 2. Prepare the final document structure
//     const productDoc = {
//       name: data.name,
//       description: data.description,
//       category: data.category.toLowerCase(),
//       type: data.type,
//       image: imageUrl,
//       price: data.price,
//       volume: data.volume,
//       createdAt: serverTimestamp(),
//     };


//     const collectionPath = `products/${data.category.toLowerCase()}/items`;

//     // 4. Save to Firestore
//     const docRef = await addDoc(collection(db, collectionPath), productDoc);

//     return docRef.id;
//   } catch (error) {
//     console.error("Firestore Upload Error:", error);
//     throw error;
//   }
// };
// export const updateProductItem = async (path: string, data: ProductData, oldImageUrl: string) => {
//   try {
//     let finalImageUrl = oldImageUrl;

//     // 1. Only upload a new image if the user selected one
//     if (data.imageFile) {
//       finalImageUrl = await UploadImage(data.imageFile);

//       if (oldImageUrl) {
//         await deleteImage(oldImageUrl);
//       }
//     }

//     const docRef = doc(db, path);

//     // 3. Update Firestore
//     await updateDoc(docRef, {
//       name: data.name,
//       description: data.description,
//       category: data.category.toLowerCase(),
//       type: data.type,
//       image: finalImageUrl,
//       price: data.price,
//       volume: data.volume,
//       updatedAt: serverTimestamp(),
//     });

//     return true;
//   } catch (error) {
//     console.error("Firestore Update Error:", error);
//     throw error;
//   }
// };


import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { db } from '@/Firebase/client';
import { deleteImage, UploadImage } from '@/Firebase/FireStore/UploadImage';

export interface ProductMap {
  small: string;
  medium: string;
  large: string;
}

export interface ProductData {
  name: string;
  description: string;
  category: string; // e.g., 'coffee', 'juices'
  type: string;     // e.g., 'hot', 'iced'
  imageFile: File | null;
  price: ProductMap;
  volume: ProductMap;
  isActive?: boolean;
}

/**
 * Uploads a new item to the specific category sub-collection
 */
export const uploadProductItem = async (data: ProductData) => {
  try {
    // 1. Upload the image first to get the URL
    const imageUrl = data.imageFile ? await UploadImage(data.imageFile) : "";

    // 2. Prepare the final document structure
    const productDoc = {
      name: data.name,
      description: data.description,
      category: data.category.toLowerCase(),
      type: data.type.toLowerCase(),
      image: imageUrl,
      price: data.price,
      volume: data.volume,
      isActive: true, // Default to true for new items
      createdAt: serverTimestamp(),
    };

    // 3. Define path: products/{category}/items
    const collectionPath = `products/${data.category.toLowerCase()}/items`;

    // 4. Save to Firestore
    const docRef = await addDoc(collection(db, collectionPath), productDoc);

    return docRef.id;
  } catch (error) {
    console.error("Firestore Upload Error:", error);
    throw error;
  }
};

/**
 * Updates an item. If the category changed, it moves the document 
 * to the correct collection to keep the database organized.
 */
export const updateProductItem = async (path: string, data: ProductData, oldImageUrl: string) => {
  try {
    let finalImageUrl = oldImageUrl;

    if (data.imageFile) {
      finalImageUrl = await UploadImage(data.imageFile);

      if (oldImageUrl) {
        await deleteImage(oldImageUrl);
      }
    }

  
    const pathSegments = path.split('/');
    const currentFolder = pathSegments[1]; 
    const targetCategory = data.category.toLowerCase();

    
    const productPayload = {
      name: data.name,
      description: data.description,
      category: targetCategory,
      type: data.type.toLowerCase(),
      image: finalImageUrl,
      price: data.price,
      volume: data.volume,
      isActive: data.isActive ?? true, 
      updatedAt: serverTimestamp(),
    };


    if (currentFolder !== targetCategory) {
  
      const newCollectionPath = `products/${targetCategory}/items`;
      await addDoc(collection(db, newCollectionPath), productPayload);


      const oldDocRef = doc(db, path);
      await deleteDoc(oldDocRef);

      return { status: "moved" };
    } else {

      const docRef = doc(db, path);
      await updateDoc(docRef, productPayload);

      return { status: "updated" };
    }
  } catch (error) {
    console.error("Firestore Update Error:", error);
    throw error;
  }
};