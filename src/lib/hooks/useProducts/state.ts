import { Product, SearchState } from '@/lib/api/types';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  currentSearch: SearchState;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  page: 1,
  hasMore: true,
  currentSearch: { type: 'all' },
};