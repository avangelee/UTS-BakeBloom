import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  category: 'food' | 'drink';
  price: number;
  description: string;
  image: string;
  ingredients: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'completed' | 'pending';
}

interface Store {
  cart: CartItem[];
  orders: Order[];
  darkMode: boolean;
  
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => void;
  toggleDarkMode: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export const useStore = create<Store>((set, get) => ({
  cart: [],
  orders: [],
  darkMode: false,
  
  addToCart: (item: MenuItem) => {
    const { cart } = get();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      set({ cart: updatedCart });
    } else {
      set({ cart: [...cart, { ...item, quantity: 1 }] });
    }
  },
  
  removeFromCart: (id: string) => {
    const { cart } = get();
    const updatedCart = cart.filter(item => item.id !== id);
    set({ cart: updatedCart });
  },
  
  updateQuantity: (id: string, quantity: number) => {
    const { cart } = get();
    if (quantity <= 0) {
      get().removeFromCart(id);
      return;
    }
    
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    set({ cart: updatedCart });
  },
  
  clearCart: () => set({ cart: [] }),
  
  checkout: () => {
    const { cart } = get();
    if (cart.length === 0) return;
    
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toISOString(),
      status: 'completed'
    };
    
    set(state => ({
      orders: [newOrder, ...state.orders],
      cart: []
    }));
  },
  
  toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),
  
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
  
  getCartItemCount: () => {
    const { cart } = get();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
}));