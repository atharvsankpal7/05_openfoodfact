import type { SearchState } from '@/lib/api/types';

export const createSearchState = (type: SearchState['type'], query?: string): SearchState => ({
  type,
  query: query || undefined,
});