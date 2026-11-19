import { createContext, useEffect, useMemo, useReducer } from "react";

export const CartContext = createContext(null);

const STORAGE_KEY = "cart";

function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function cartReducer(items, action) {
  switch (action.type) {
    case "ADD": {
      const { product, quantity } = action;
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...items,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        },
      ];
    }
    case "REMOVE":
      return items.filter((i) => i.id !== action.id);
    case "UPDATE_QTY":
      return items.map((i) =>
        i.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i
      );
    case "CLEAR":
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const value = useMemo(() => {
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return {
      items,
      totalItems,
      subtotal,
      addToCart: (product, quantity = 1) =>
        dispatch({ type: "ADD", product, quantity }),
      removeFromCart: (id) => dispatch({ type: "REMOVE", id }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: "UPDATE_QTY", id, quantity }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}