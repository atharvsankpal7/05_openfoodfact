import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api, Product } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function ProductPage() {
  let { code } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!code) {
        code = "all";
      }
      try {
        const data = await api.getProductByBarcode(code);
        setProduct(data);
      } catch (error) {
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [code]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-64 bg-muted rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-xl text-muted-foreground">Product not found</p>
        <Button asChild className="mt-4">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button asChild variant="ghost" className="mb-8">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img
            src={
              product.image_front_url ||
              product.image_url ||
              "https://images.unsplash.com/photo-1606787366850-de6330128bfc"
            }
            alt={product.product_name}
            className="w-full rounded-lg shadow-lg"
          />
          <div className="flex gap-2 flex-wrap">
            {product.labels?.split(",").map((label) => (
              <Badge key={label} variant="secondary">
                {label.trim()}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.product_name}</h1>
            <p className="text-muted-foreground">{product.categories}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Nutrition Grade</h2>
            <Badge
              className={`text-lg px-4 py-2 ${
                product.nutrition_grades?.toLowerCase() === "a"
                  ? "bg-green-500"
                  : product.nutrition_grades?.toLowerCase() === "b"
                  ? "bg-lime-500"
                  : product.nutrition_grades?.toLowerCase() === "c"
                  ? "bg-yellow-500"
                  : product.nutrition_grades?.toLowerCase() === "d"
                  ? "bg-orange-500"
                  : "bg-red-500"
              }`}
            >
              {product.nutrition_grades?.toUpperCase() || "Unknown"}
            </Badge>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Nutritional Values (per 100g)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium">Energy</p>
                <p className="text-2xl">
                  {product.nutriments?.energy_100g || 0} kcal
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium">Fat</p>
                <p className="text-2xl">{product.nutriments?.fat_100g || 0}g</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium">Carbohydrates</p>
                <p className="text-2xl">
                  {product.nutriments?.carbohydrates_100g || 0}g
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium">Proteins</p>
                <p className="text-2xl">
                  {product.nutriments?.proteins_100g || 0}g
                </p>
              </div>
            </div>
          </div>

          {product.ingredients_text && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <p className="text-muted-foreground">
                {product.ingredients_text}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
