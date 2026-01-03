import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      
      addToCart: (item) => {
        const { cart } = get();
        const existingIndex = cart.findIndex(
          (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color
        );
        
        if (existingIndex >= 0) {
          const newCart = [...cart];
          newCart[existingIndex].quantity += item.quantity;
          set({ cart: newCart });
        } else {
          set({ cart: [...cart, item] });
        }
      },
      
      removeFromCart: (productId, size, color) => {
        const { cart } = get();
        set({
          cart: cart.filter(
            (i) => !(i.product.id === productId && i.size === size && i.color === color)
          ),
        });
      },
      
      updateQuantity: (productId, size, color, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          get().removeFromCart(productId, size, color);
          return;
        }
        set({
          cart: cart.map((i) =>
            i.product.id === productId && i.size === size && i.color === color
              ? { ...i, quantity }
              : i
          ),
        });
      },
      
      clearCart: () => set({ cart: [] }),
      
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      setCartOpen: (open) => set({ isCartOpen: open }),
      
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      
      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'pablo-store-cart',
    }
  )
);
