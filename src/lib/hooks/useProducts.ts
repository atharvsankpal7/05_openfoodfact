import { useState, useEffect, useCallback } from 'react';
import { api, Product, SearchResponse } from '@/lib/api';
import { toast } from 'sonner';

interface SearchState {
  type: 'all' | 'search' | 'barcode' | 'category';
  query?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentSearch, setCurrentSearch] = useState<SearchState>({ type: 'all' });

  const loadProducts = useCallback(async (reset = false) => {
    const currentPage = reset ? 1 : page;
    
    // Don't load more if we're already loading or there's no more data (unless it's a reset)
    if (!reset && (loading || !hasMore)) return;

    setLoading(true);

    try {
      let response: SearchResponse;

      switch (currentSearch.type) {
        case 'search':
          response = await api.searchProducts(currentSearch.query || '', currentPage);
          break;
        case 'category':
          response = await api.getProductsByCategory(currentSearch.query || '', currentPage);
          break;
        case 'barcode':
          const product = await api.getProductByBarcode(currentSearch.query || '');
          response = { products: [product], count: 1, page: 1, page_size: 1 };
          break;
        default:
          response = await api.getAllProducts(currentPage);
      }

      const newProducts = response.products || [];
      
      setProducts(prev => reset ? newProducts : [...prev, ...newProducts]);
      setHasMore(newProducts.length >= 24);
      setPage(prev => reset ? 2 : prev + 1);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
      if (reset) {
        setProducts([]);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [page, currentSearch, loading, hasMore]);

  const resetSearch = useCallback((newSearch: SearchState) => {
    setCurrentSearch(newSearch);
    setPage(1);
    setHasMore(true);
    setProducts([]);
  }, []);

  const searchProducts = useCallback(async (query: string) => {
    resetSearch({ type: 'search', query });
    await loadProducts(true);
  }, [loadProducts]);

  const searchByBarcode = useCallback(async (barcode: string) => {
    resetSearch({ type: 'barcode', query: barcode });
    await loadProducts(true);
  }, [loadProducts]);

  const loadProductsByCategory = useCallback(async (category: string | null) => {
    resetSearch({
      type: category ? 'category' : 'all',
      query: category || undefined,
    });
    await loadProducts(true);
  }, [loadProducts]);

  // Initial load
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