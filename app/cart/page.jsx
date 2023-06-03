"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { CartContext } from "@/context/cart.context";
import React, { useContext } from "react";

const Cart = () => {
  const [allProducts, setAllProducts] = useState([]);
  const { state, dispatch } = useContext(CartContext);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/products`);

      const data = await response.json();
      console.log(data);
      setAllProducts(data);
    };
    fetchPosts();
  }, []);
  const createProduct = async () => {
    console.log("123123");
    try {
      const response = await fetch("/api/products/new", {
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  //   const filterPrompts = (searchtext) => {
  //     const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  //     return allPosts.filter(
  //       (item) =>
  //         regex.test(item.creator.username) ||
  //         regex.test(item.tag) ||
  //         regex.test(item.prompt)
  //     );
  //   };

  //   const handleSearchChange = (e) => {
  //     clearTimeout(searchTimeout);
  //     setSearchText(e.target.value);

  //     // debounce method
  //     setSearchTimeout(
  //       setTimeout(() => {
  //         const searchResult = filterPrompts(e.target.value);
  //         setSearchedResults(searchResult);
  //       }, 500)
  //     );
  //   };

  //   const handleTagClick = (tagName) => {
  //     setSearchText(tagName);

  //     const searchResult = filterPrompts(tagName);
  //     setSearchedResults(searchResult);
  //   };

  return (
    <section className="cart flex flex-col  pb-44 mt-14 px-4 py-4 h-screen">
      <h4 className="font-bold text-2xl">YOUR BAG</h4>
      {state?.cart.cartItems &&
        (state?.cart.cartItems.length > 0 ? (
          <div className="w-[70%] bg-slate-100 px-2 py-4 rounded-sm mt-4">
            {state?.cart.cartItems.map((item, index) => (
              <div className="flex  px-2 py-2" key={index}>
                <Image
                  width={80}
                  height={80}
                  src={item?.images[0]?.image}
                  alt={item?.images[0]?.image}
                  className="rounded-sm"
                />
                <div className="w-full flex items-center flex-wrap px-4">
                  <div className="truncate">{item.name}</div>

                  <div className="flex  items-center w-full">
                    ${item.price}&nbsp;&nbsp;x&nbsp;&nbsp;
                    <input
                      type="number"
                      value={item.qty}
                      min={1}
                      className="w-[40px] text-right"
                      onChange={(e) =>
                        dispatch({
                          type: "CART_ITEM_QTY",
                          payload: { product:item, value:e.target.value },
                        })
                      }
                    />{" "}
                    &nbsp;&nbsp; = &nbsp;&nbsp;$
                    {item.price * item.qty}
                  </div>
                </div>
                <div
                  className="flex justify-center items-center cursor-pointer"
                  onClick={() =>
                    dispatch({ type: "CART_REMOVE_ITEM", payload: item })
                  }
                >
                  <TrashIcon width={20} height={20} fill="black" />
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center w-full px-2 border-t border-black font-bold">
              <div className="header__cart__total__text">TOTAL:</div>
              <div className="">
                $
                {state?.cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </div>
            </div>
          </div>
        ) : (
          <div className="header__cart__items__empty">BAG IS EMPTY</div>
        ))}
    </section>
  );
};

export default Cart;
