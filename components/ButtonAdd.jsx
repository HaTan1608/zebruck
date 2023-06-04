"use client"
import { CartContext } from "@/context/cart.context";
import React, { useContext } from "react";
function ButtonAdd({ product }) {
  const { state, dispatch } = useContext(CartContext);
  return (
  
      <div className="space-y-3 text-sm">
        <button
          onClick={() => dispatch({ type: "CART_ADD_ITEM", payload: product })}
          className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
        >
          ADD TO BAG
        </button>
      </div>
  );
}

export default ButtonAdd;
