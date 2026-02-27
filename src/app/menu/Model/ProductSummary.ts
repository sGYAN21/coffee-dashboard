import { collection, collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '@/Firebase/firebase'; 
export interface CategorySummary {
  label: string;
  count: number;
  icon: string;
  type: string; 
}

export const ProductSummary = async (): Promise<CategorySummary[]> => {
  const categories: CategorySummary[] = [
    { label: 'Coffees', count: 0, icon: '☕', type: 'coffee' },
    { label: 'Juices', count: 0, icon: '🍹', type: 'juices' },
    { label: 'Liquors', count: 0, icon: '🥃', type: 'liquor' },
    { label: 'Mocktails', count: 0, icon: '🍸', type: 'mocktails' },
     { label: 'Shakes', count: 0, icon: '🥤', type: 'shakes' },
    { label: 'Protein Shakes', count: 0, icon: '💪', type: 'protein_shakes' },
   
  ];

  try {
    const querySnapshot = await getDocs(collectionGroup(db, "items")); 
    
    const counts: Record<string, number> = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const type = data.type; 
      if (type) {
        counts[type] = (counts[type] || 0) + 1;
      }
    });

    // 2. Map counts back to our display array
    return categories.map(cat => ({
      ...cat,
      count: counts[cat.type] || 0
    }));

  } catch (error) {
    console.error("Error fetching summary:", error);
    return categories;
  }
};