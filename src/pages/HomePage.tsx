import { SearchBar } from '@/components/SearchBar';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { SortFilter } from '@/components/filters/SortFilter';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCategories } from '@/lib/hooks/useCategories';
import { useSort } from '@/lib/hooks/useSort';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import { useCallback } from 'react';

export default function HomePage() {
  const {
    products,
    loading,
    hasMore,
    loadMore,
    searchProducts,
    searchByBarcode,
    loadProductsByCategory,
  } = useProducts();

  const { categories, selectedCategory, setSelectedCategory } = useCategories();
  const { sortBy, setSortBy, sortProducts } = useSort();

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  const { lastElementRef } = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: handleLoadMore,
  });

  const handleCategoryChange = async (category: string | null) => {
    setSelectedCategory(category);
    await loadProductsByCategory(category);
  };

  const sortedProducts = sortProducts(products);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Food Product Explorer</h1>
      <div className="max-w-[1200px] mx-auto space-y-6">
        <SearchBar onSearch={searchProducts} onBarcodeSearch={searchByBarcode} />
        
        <div className="flex gap-4 flex-wrap">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <SortFilter value={sortBy} onChange={setSortBy} />
        </div>

        <ProductGrid 
          products={sortedProducts} 
          loading={loading}
          lastProductRef={lastElementRef}
        />
      </div>
    </div>
  );
}