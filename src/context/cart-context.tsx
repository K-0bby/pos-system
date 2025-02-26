'use client'
import { createContext, useContext, useReducer } from 'react';
import { Product } from '@/lib/product';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'REMOVE_ONE'; payload: string };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

// Helper function to find an item in the cart
const findCartItem = (items: CartItem[], id: string) => items.find(item => item.id === id);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = findCartItem(state.items, action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price.retail
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price.retail
      };
    }
    case 'REMOVE_ITEM': {
      const item = findCartItem(state.items, action.payload);
      if (!item) return state;
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - item.price.retail * item.quantity
      };
    }
    case 'REMOVE_ONE': {
      const item = findCartItem(state.items, action.payload);
      if (!item) return state;

      return {
        ...state,
        items: item.quantity === 1
          ? state.items.filter(i => i.id !== action.payload)
          : state.items.map(i =>
              i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
            ),
        total: state.total - item.price.retail
      };
    }
    case 'UPDATE_QUANTITY': {
      const item = findCartItem(state.items, action.payload.id);
      if (!item || action.payload.quantity <= 0) return state;

      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
        total: state.total + item.price.retail * quantityDiff
      };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
