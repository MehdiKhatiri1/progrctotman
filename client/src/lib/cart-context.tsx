import { createContext, useContext, useReducer, ReactNode } from "react";
import { Service } from "@shared/schema";

interface CartItem {
  service: Service;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Service }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        item => item.service.id === action.payload.id
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.service.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + Number(action.payload.price)
        };
      }

      return {
        ...state,
        items: [...state.items, { service: action.payload, quantity: 1 }],
        total: state.total + Number(action.payload.price)
      };
    }
    case "REMOVE_ITEM": {
      const item = state.items.find(item => item.service.id === action.payload);
      if (!item) return state;

      return {
        ...state,
        items: state.items.filter(item => item.service.id !== action.payload),
        total: state.total - (Number(item.service.price) * item.quantity)
      };
    }
    case "CLEAR_CART":
      return { items: [], total: 0 };
    default:
      return state;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
