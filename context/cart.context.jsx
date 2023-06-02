"use client";

import React, { Dispatch, createContext, useReducer } from "react";
const initialState = [];
const reducer = (state, action, product) => {
  console.log(product);
  switch (action.type) {
    case "INCREMENT":
      return [...state, { name: product.name, qty: 1, price: product.price }];
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
};

export const CartContext = createContext({
  state: initialState,
  dispatch: (type, product) => null,
});

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
