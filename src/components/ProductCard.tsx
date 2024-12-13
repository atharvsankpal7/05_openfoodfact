import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Apple, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/api";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/hooks/useCart";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);

  const getNutritionColor = (grade: string) => {
    const colors: Record<string, string> = {
      a: "bg-green-500",
      b: "bg-lime-500",
      c: "bg-yellow-500",
      d: "bg-orange-500",
      e: "bg-red-500",
    };
    return colors[grade.toLowerCase()] || "bg-gray-500";
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success("Added to cart");
  };

  return (
    <Link to={`/product/${product.code}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 h-full">
        <CardHeader className="relative p-0">
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <img
              src={product.image_url || "https://images.unsplash.com/photo-1606787366850-de6330128bfc"}
              alt={product.product_name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute top-2 right-2">
            <Badge className={`${getNutritionColor(product.nutrition_grades || 'unknown')}`}>
              {product.nutrition_grades?.toUpperCase() || '?'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-2">{product.product_name || "Unknown Product"}</h3>
            <Apple className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {product.categories || "Uncategorized"}
          </p>
          <Button
            className="w-full mt-4"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}