import { useState, useEffect, useCallback } from 'react';
import { initialState, type ProductsState } from './state';
import { fetchProducts } from './actions';

export function useProducts() {
  const [state, setState] = useState<ProductsState>(initialState);
  const { products, loading, page, hasMore, currentSearch } = state;

  const updateState = useCallback((updates: Partial<ProductsState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const loadProducts = useCallback(async (reset = false) => {
    if (!reset && (loading || !hasMore)) return;

    updateState({ loading: true });

    try {
      const response = await fetchProducts(state, reset);
      
      if (response) {
        const newProducts = response.products || [];
        updateState({
          products: reset ? newProducts : [...products, ...newProducts],
          hasMore: newProducts.length >= 24,
          page: reset ? 2 : page + 1,
        });
      } else if (reset) {
        updateState({
          products: [],
          hasMore: false,
        });
      }
    } finally {
      updateState({ loading: false });
    }
  }, [loading, hasMore, products, page, state, updateState]);

  const resetSearch = useCallback((newSearch: ProductsState['currentSearch']) => {
    updateState({
      currentSearch: newSearch,
      page: 1,
      hasMore: true,
      products: [],
    });
  }, [updateState]);

  const searchProducts = useCallback(async (query: string) => {
    resetSearch({ type: 'search', query });
    await loadProducts(true);
  }, [loadProducts, resetSearch]);

  const searchByBarcode = useCallback(async (barcode: string) => {
    resetSearch({ type: 'barcode', query: barcode });
    await loadProducts(true);
  }, [loadProducts, resetSearch]);

  const loadProductsByCategory = useCallback(async (category: string | null) => {
    resetSearch({
      type: category ? 'category' : 'all',
      query: category || undefined,
    });
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