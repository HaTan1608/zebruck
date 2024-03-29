"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { AiFillCheckCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Checkbox, Button, Modal } from "antd";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { CartContext } from "@/context/cart.context";
import React, { useContext } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
const Cart = (props) => {
  const { state, dispatch } = useContext(CartContext);
  const { data: session } = useSession();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!state?.cart?.shippingAddress.address) {
      router.push("/cart");
    }
  }, []);

  const handleSubmit = (value) => {
    console.log(value);
    value.preventDefault();
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { ...shippingInfo, email: session.user.email },
    });
  };
  const createProduct = async (details) => {
    console.log("123123", details);
    try {
      await fetch("/api/orders/new", {
        method: "POST",
        body: JSON.stringify({
          ...details,
          ...state?.cart,
        }),
      });
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="cart flex flex-col  pb-44 mt-14 px-4 py-4 h-screen">
      <Modal
        title=""
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <AiFillCheckCircle size={72} color="rgb(0,255,0)" />
          </div>
          <p
            style={{
              fontWeight: "18px",
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            Your order have been created
          </p>
          <p>You can check order&apos;s status in your profile</p>
        </div>
      </Modal>
      <h4 className="font-bold text-2xl">YOUR ORDER</h4>
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Name:
              </label>
              <input
                disabled
                type="text"
                id="name"
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter recipient's phone"
                required
                value={state?.cart?.shippingAddress?.name}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Email:
              </label>
              <input
                disabled
                value={state?.cart?.shippingAddress?.email}
                type="text"
                id="email"
                className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone:
              </label>
              <input
                disabled
                type="text"
                id="phone"
                className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter recipient's phone"
                required
                value={state?.cart?.shippingAddress?.phone}
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Address:
              </label>
              <input
                disabled
                value={state?.cart?.shippingAddress?.address}
                type="text"
                id="address"
                className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter recipient's address , city, state/province"
                required
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Country:
              </label>
              <input
                disabled
                value={state?.cart?.shippingAddress?.country}
                type="text"
                id="country"
                className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Country"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                City:
              </label>
              <input
                disabled
                value={state?.cart?.shippingAddress?.city}
                type="text"
                id="city"
                className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Country"
                required
              />
            </div>
            <div>
              <label
                htmlFor="zipCode"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Zip/Postal Code:
              </label>
              <input
                disabled
                value={state?.cart?.shippingAddress?.zipCode}
                type="text"
                id="zipCode"
                className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Zip/Postal Code"
                required
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              >
                I have checked my order and shipping address
              </Checkbox>
            </div>
            <PayPalScriptProvider
              options={{
                clientId:
                  "AZNh34UnWSPghdyZSKsxTqkvo8OcZCf83cisvwPaYJZ1Y8H9g5xF1-E_v57JBqQFgcMnB1pRV4hpGikW",
                currency: "USD",
                intent: "capture",
              }}
            >
              <PayPalButtons
                disabled={!checked}
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    application_context: {
                      brand_name: "Zebruck",
                      locale: "us-US",
                      shipping_preference: "SET_PROVIDED_ADDRESS",
                    },
                    purchase_units: [
                      {
                        items: state?.cart?.cartItems.map((x) => {
                          return {
                            name: x.name,
                            quantity: x.qty,
                            unit_amount: {
                              currency_code: "USD",
                              value: x.price,
                            },
                          };
                        }),
                        amount: {
                          value: state?.cart.cartItems.reduce(
                            (a, c) => a + c.price * c.qty,
                            0
                          ),

                          currency_code: "USD",
                          breakdown: {
                            item_total: {
                              value: state?.cart.cartItems.reduce(
                                (a, c) => a + c.price * c.qty,
                                0
                              ),
                              currency_code: "USD",
                            },
                          },
                        },
                        shipping: {
                          name: {
                            full_name: state?.cart?.shippingAddress?.name,
                          },
                          address: {
                            address_line_1:
                              state?.cart?.shippingAddress?.address,
                            admin_area_2: state?.cart?.shippingAddress?.city,
                            admin_area_1: state?.cart?.shippingAddress?.country,
                            postal_code: state?.cart?.shippingAddress?.zipCode,
                            country_code: "VN",
                          },
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    createProduct(details);
                  });
                }}
              />
            </PayPalScriptProvider>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cart;
