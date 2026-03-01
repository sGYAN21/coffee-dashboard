import { collectionGroup, query, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/Firebase/client';
export interface ProductRow {
  id: string;
  name: string;
  price: string; 
  isActive: boolean;
  category: string;
  type: string;
  rawPrices: any;    
  rawVolumes: any;     
  rating: number;
  imageUrl: string;
  fullPath: string; 
  description?: string;
}


export const ProductItem = async (): Promise<ProductRow[]> => {
  try {
    const itemsQuery = query(collectionGroup(db, 'items'));
    const querySnapshot = await getDocs(itemsQuery);

    return querySnapshot.docs.map((item) => {
      const data = item.data();
      return {
        id: item.id.substring(0, 5).toUpperCase(),
        name: data.name || 'Unnamed',
        type: data.type ,
        category: data.category || 'N/A',
        price: data.price?.small ? `$${data.price.small}` : 'N/A',
        isActive: data.isActive ?? true,
        rawPrices: data.price || {},
        rawVolumes: data.volume || {},
        rating: data.rating || 0,
        imageUrl: data.image,
        fullPath: item.ref.path,
        description: data.description || '',
      };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Deletes a product using its full database path
 */
export const deleteProduct = async (path: string) => {
  const docRef = doc(db, path);
  await deleteDoc(docRef);
};

export const updateProductField = async (path: string, data: any) => {
  const docRef = doc(db, path);
  return await updateDoc(docRef, data);
};