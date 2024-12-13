import { useCart } from '@/lib/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CartContent() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  const total = items.reduce((acc, item) => {
    return acc + (item.quantity || 0);
  }, 0);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.code}
              className="flex items-center gap-4 py-4 border-b"
            >
              <img
                src={item.product.image_url}
                alt={item.product.product_name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.product.product_name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(item.product.code, Math.max(0, item.quantity - 1))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(item.product.code, item.quantity + 1)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={() => removeItem(item.product.code)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t pt-4 mt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Items:</span>
          <span className="font-bold">{total}</span>
        </div>
        <Button
          variant="destructive"
          className="w-full"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
}