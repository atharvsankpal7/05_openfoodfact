import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
  };
}