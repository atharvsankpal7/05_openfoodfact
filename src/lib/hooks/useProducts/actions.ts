import { toast } from 'sonner';
import { api } from '@/lib/api';
import type { ProductsState } from './state';
import type { SearchResponse } from '@/lib/api/types';

export async function fetchProducts(
  state: ProductsState,
  reset = false
): Promise<SearchResponse | null> {
  const currentPage = reset ? 1 : state.page;
  
  try {
    switch (state.currentSearch.type) {
      case 'search':
        return await api.searchProducts(state.currentSearch.query || '', currentPage);
      case 'category':
        return await api.getProductsByCategory(state.currentSearch.query || '', currentPage);
      case 'barcode':
        const product = await api.getProductByBarcode(state.currentSearch.query || '');
        return { products: [product], count: 1, page: 1, page_size: 1 };
      default:
        return await api.getAllProducts(currentPage);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    toast.error('Failed to load products');
    return null;
  }
}