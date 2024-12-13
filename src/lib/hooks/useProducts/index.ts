import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import type { ProductsState, UseProductsReturn } from './types';
import { createSearchState } from './utils';

const initialState: ProductsState = {
  products: [],
  loading: false,
  page: 1,
  hasMore: true,
  currentSearch: { type: 'all' },
};

export function useProducts(): UseProductsReturn {
  const [state, setState] = useState<ProductsState>(initialState);
  const { products, loading, page, hasMore, currentSearch } = state;

  const updateState = useCallback((updates: Partial<ProductsState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const loadProducts = useCallback(async (reset = false) => {
    const currentPage = reset ? 1 : page;
    
    if (!reset && (loading || !hasMore)) return;

    updateState({ loading: true });

    try {
      const response = await (async () => {
        switch (currentSearch.type) {
          case 'search':
            return api.searchProducts(currentSearch.query || '', currentPage);
          case 'category':
            return api.getProductsByCategory(currentSearch.query || '', currentPage);
          case 'barcode':
            const product = await api.getProductByBarcode(currentSearch.query || '');
            return { products: [product], count: 1, page: 1, page_size: 1 };
          default:
            return api.getAllProducts(currentPage);
        }
      })();

      const newProducts = response.products || [];
      
      updateState({
        products: reset ? newProducts : [...products, ...newProducts],
        hasMore: newProducts.length >= 24,
        page: reset ? 2 : page + 1,
      });
    } catch (error) {
      toast.error('Failed to load products');
      if (reset) {
        updateState({
          products: [],
          hasMore: false,
        });
      }
    } finally {
      updateState({ loading: false });
    }
  }, [page, currentSearch, loading, hasMore, products, updateState]);

  const resetSearch = useCallback((newSearch: ProductsState['currentSearch']) => {
    updateState({
      currentSearch: newSearch,
      page: 1,
      hasMore: true,
      products: [],
    });
  }, [updateState]);

  const searchProducts = useCallback(async (query: string) => {
    resetSearch(createSearchState('search', query));
    await loadProducts(true);
  }, [loadProducts, resetSearch]);

  const searchByBarcode = useCallback(async (barcode: string) => {
    resetSearch(createSearchState('barcode', barcode));
    await loadProducts(true);
  }, [loadProducts, resetSearch]);

  const loadProductsByCategory = useCallback(async (category: string | null) => {
    resetSearch(createSearchState(category ? 'category' : 'all', category || undefined));
    await loadProducts(true);
  }, [loadProducts, resetSearch]);

  useEffect(() => {
    loadProducts(true);
  }, []);

  return {
    products,
    loading,
    hasMore,
    loadMore: () => loadProducts(false),
    searchProducts,
    searchByBarcode,
    loadProductsByCategory,
  };
}