import { ProductCard } from "./ProductCard";
import { Product } from "@/lib/api";
import { LoadingSpinner } from "./LoadingSpinner";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  lastProductRef?: (node: HTMLDivElement) => void;
}

export function ProductGrid({ products, loading, lastProductRef }: ProductGridProps) {
  if (!Array.isArray(products)) {
    console.error('Products is not an array:', products);
    return null;
  }

  return (
    <div className="space-y-6">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product?.code || index}
              ref={index === products.length - 1 ? lastProductRef : undefined}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : !loading ? (
        <p className="text-center text-muted-foreground py-8">
          No products found. Try adjusting your search.
        </p>
      ) : null}
      
      {loading && <LoadingSpinner />}
    </div>
  );
}