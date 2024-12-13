import type { Product, SearchState } from '@/lib/api/types';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  currentSearch: SearchState;
}

export interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  searchByBarcode: (barcode: string) => Promise<void>;
  loadProductsByCategory: (category: string | null) => Promise<void>;
}