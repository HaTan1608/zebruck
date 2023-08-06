"use client";

import React, { Dispatch, createContext, useReducer } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { notification } from "antd";
import { notifySuccess } from "@/components/notification";
const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      notifySuccess("Added to cart!");
      const newItem = action.payload;
      const existItem = state?.cart?.cartItems?.find(
        (item) => item?._id === newItem?._id
      );
      const cartItems = existItem
        ? state?.cart?.cartItems?.map((item) =>
            item?._id === existItem?._id
              ? { ...newItem, qty: Number(existItem.qty) + 1 }
              : item
          )
        : state?.cart?.cartItems?.length >= 0
        ? [...state.cart.cartItems, { ...newItem, qty: 1 }]
        : [];
      Cookies.set(
        "cart",
        JSON.stringify({ ...state?.cart, cartItems: cartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems: cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state?.cart?.cartItems?.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_RESET":
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };

    case "CART_ITEM_QTY":
      console.log(action.payload);
      const cartItems = state?.cart?.cartItems?.map((item) =>
        item?._id === action?.payload?.product?._id
          ? { ...item, qty: action.payload.value }
          : item
      );

      Cookies.set(
        "cart",
        JSON.stringify({ ...state?.cart, cartItems: cartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems: cartItems } };
    case "CART_CLEAR_ITEMS":
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "SAVE_SHIPPING_ADDRESS":
      router.push("/payment");
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...action.payload,
          },
        },
      };

    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    default:
      return state;
  }
}
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
