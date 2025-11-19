import React, { createContext, useContext, useReducer } from 'react';
import type { ProductVariant } from '../types';

type CartItem = {
  id: string; // variant id + unique key if needed
  productId: string;
  variant: ProductVariant;
  pieces: number; // total pieces (e.g., 100, 200)
};

type State = { items: CartItem[] };
type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QTY'; payload: { id: string; pieces: number } }
  | { type: 'CLEAR' };

const CartContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: { items: [] }, dispatch: () => null });

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM': {
      // merge if same variant
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === existing.id ? { ...i, pieces: i.pieces + action.payload.pieces } : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.id !== action.payload.id) };
    case 'UPDATE_QTY':
      return {
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, pieces: action.payload.pieces } : i
        ),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

// helper price calc
export const calcPrice = (variant: ProductVariant, pieces: number): number => {
  // pricePer100 is for 100pcs
  const factor = pieces / 100;
  const base = variant.pricePer100 * factor;
  // example surcharges:
  // gloss +10% over base for premium finish if needed (but our pricePer100 already encodes finish differences)
  // add small rounding
  return Math.round(base);
};
