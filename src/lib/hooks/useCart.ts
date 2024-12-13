import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/api';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productCode: string) => void;
  updateQuantity: (productCode: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.code === product.code
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.code === product.code
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        });
      },
      removeItem: (productCode) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.code !== productCode),
        }));
      },
      updateQuantity: (productCode, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.code === productCode ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);