import { useState } from 'react';
import { Product } from '@/lib/api';
import { type SortOption } from '@/components/filters/SortFilter';

export function useSort() {
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const sortProducts = (products: Product[]) => {
    if (!Array.isArray(products)) return [];
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return (a.product_name || '').localeCompare(b.product_name || '');
        case 'name-desc':
          return (b.product_name || '').localeCompare(a.product_name || '');
        case 'grade-asc':
          return (a.nutrition_grades || 'z').localeCompare(b.nutrition_grades || 'z');
        case 'grade-desc':
          return (b.nutrition_grades || 'z').localeCompare(a.nutrition_grades || 'z');
        default:
          return 0;
      }
    });
  };

  return {
    sortBy,
    setSortBy,
    sortProducts,
  };
}