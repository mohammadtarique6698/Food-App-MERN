import React, { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();
const DispatchContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case "REMOVE_FROM_CART":
      console.log("State before removal:", state.cart);
      //console.log("ID to remove:", action.payload.id);
      const filteredCart = state.cart.filter(
        (item) => item._id !== action.payload.id
      );
      console.log("State after removal:", filteredCart);
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };

    case "UPDATE_CART_ITEM_QUANTITY":
      const updatedCartItem = state.cart.map((item) => {
        if (item._id === action.payload.id) {
          return { ...item, qty: action.payload.qty };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCartItem));
      return { ...state, cart: updatedCartItem };

    case "DROP":
      return { ...state, cart: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useDispatch = () => useContext(DispatchContext);
