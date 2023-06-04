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
  const { state, dispatch } = useContext(CartContext);
  const { data: session } = useSession();
  // Search states
  const [shippingInfo,setShippingInfo]=useState({
    name:"",
    email:"",
    phone:"",
    address:"",
  });

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
  const handleSubmit = (value) => {
    console.log(value)
    value.preventDefault()
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: {...shippingInfo,email:session.user.email} });
  };
  return (
    <section className="cart flex flex-col  pb-44 mt-14 px-4 py-4 h-screen">
      <h4 className="font-bold text-2xl">YOUR BAG</h4>
      <div className="flex flex-wrap justify-between ">
        {state?.cart.cartItems &&
          (state?.cart.cartItems.length > 0 ? (
            <div className="w-full md:w-[70%]  mt-4">
              <div className="w-full bg-white  rounded-md px-2 py-4">
                {state?.cart.cartItems.map((item, index) => (
                  <div className="flex  px-2 py-2" key={index}>
                    <Image
                      width={80}
                      height={80}
                      src={item?.images[0]?.image}
                      alt={item?.images[0]?.image}
                      className="rounded-sm"
                    />
                    <div className="w-full flex items-center flex-wrap px-4 max-w-[calc(100%-80px)]">
                      <Link
                        href={`/product/${item._id}`}
                        className="font-semibold flex items-center justify-between mt-4 mb-1"
                      >
                        <p className="truncate">{item.name}</p>
                      </Link>
                      <div className="flex justify-between items-center w-full">
                        <div className="flex  items-center w-full">
                          ${item.price}&nbsp;&nbsp;x&nbsp;&nbsp;
                          <input
                            type="number"
                            value={item.qty}
                            min={1}
                            max={10}
                            className="w-[40px] text-right"
                            onChange={(e) =>
                              dispatch({
                                type: "CART_ITEM_QTY",
                                payload: {
                                  product: item,
                                  value: e.target.value,
                                },
                              })
                            }
                          />{" "}
                          &nbsp;&nbsp; = &nbsp;&nbsp;$
                          {item.price * item.qty}
                        </div>
                        <div
                          className="flex justify-center items-center cursor-pointer"
                          onClick={() =>
                            dispatch({
                              type: "CART_REMOVE_ITEM",
                              payload: item,
                            })
                          }
                        >
                          <TrashIcon width={20} height={20} fill="black" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center w-full px-2 border-t border-black font-bold">
                  <div className="header__cart__total__text">TOTAL:</div>
                  <div className="">
                    $
                    {state?.cart.cartItems.reduce(
                      (a, c) => a + c.price * c.qty,
                      0
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="header__cart__items__empty">BAG IS EMPTY</div>
          ))}
        <div className="w-full md:w-[28%]   mt-4 ">
          <form
            onSubmit={handleSubmit}
            className={` bg-white w-full rounded-md px-4 py-4 w-full  flex flex-col glassmorphism`}
          >
            <p className="font-bold">SHIP INFORMATION</p>
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Name:
              </label>
              <input
                disabled={!session?.user}
                type="text"
                id="name"
                onChange={(e)=>setShippingInfo({...shippingInfo,name:e.target.value})}
                class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter recipient's phone"
                required
              />
            </div>
            <div>
              <label
                for="email"
                class="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Email:
              </label>
              <input
                disabled
                value={session?.user?.email}
                type="text"
                id="email"
                class=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                for="phone"
                class="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone:
              </label>
              <input
                disabled={!session?.user}
                onChange={(e)=>setShippingInfo({...shippingInfo,phone:e.target.value})}
                type="text"
                id="phone"
                class=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter recipient's name"
                required
              />
            </div>
            <div>
              <label
                for="address"
                class="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Address:
              </label>
              <input
                disabled={!session?.user}
                onChange={(e)=>setShippingInfo({...shippingInfo,address:e.target.value})}
                type="text"
                id="address"
                class=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter recipient's address"
                required
              />
            </div>
            <div className="flex-end mx-3 mt-5">
              <button
                type="submit"
                // disabled={submitting}
                className={`px-5 py-1.5 text-sm  w-full rounded-full text-white ${
                  session?.user
                    ? "bg-blue-600 "
                    : "bg-slate-400 cursor-not-allowed"
                }`}
              >
                {session?.user ? "GO PAYMENT" : "PLEASE SIGN IN BEFORE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cart;
