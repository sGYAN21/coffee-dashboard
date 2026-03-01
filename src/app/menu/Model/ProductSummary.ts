import { collection, collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '@/Firebase/client'; 
export interface CategorySummary {
  label: string;
  count: number;
  icon: string;
  category: string; 
}

export const ProductSummary = async (): Promise<CategorySummary[]> => {
  const categories: CategorySummary[] = [
    { label: 'Coffees', count: 0, icon: '☕', category: 'coffee' },
    { label: 'Juices', count: 0, icon: '🍹', category: 'juices' },
    { label: 'Liquors', count: 0, icon: '🥃', category: 'liquor' },
    { label: 'Mocktails', count: 0, icon: '🍸', category: 'mocktails' },
     { label: 'Shakes', count: 0, icon: '🥤', category: 'shakes' },
    { label: 'Protein Shakes', count: 0, icon: '💪', category: 'protein_shakes' },
   
  ];

  try {
    const querySnapshot = await getDocs(collectionGroup(db, "items")); 
    
    const counts: Record<string, number> = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const category = data.category; 
      if (category) {
        counts[category] = (counts[category] || 0) + 1;
      }
    });

    // 2. Map counts back to our display array
    return categories.map(cat => ({
      ...cat,
      count: counts[cat.category] || 0
    }));

  } catch (error) {
    console.error("Error fetching summary:", error);
    return categories;
  }
};