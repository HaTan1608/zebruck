"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { CartContext } from "@/context/cart.context";
import React, { useContext } from "react";
const Header = () => {
  const { data: session } = useSession();
  const { state, dispatch } = useContext(CartContext);
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [visibleCart, setVisibleCart] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <header className="flex items-center px-2 md:px-6 py-2 justify-between fixed top-0 w-full bg-white z-50 shadow max-w-[1240px]  mx-auto">
      <Link href="/" className="flex gap-2 flex-center items-center">
        <Image
          src="/assets/images/logo.jpeg"
          alt="logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="logo_text">Zebruck</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <Link
          href="/cart"
          className="relative mr-6"
          onMouseOver={() => setVisibleCart(true)}
          onMouseLeave={() => setVisibleCart(false)}
        >
          <ShoppingBagIcon className="h-8 w-8" />
          {state?.cart?.cartItems.reduce((a, c) => a + c.qty, 0) > 0 && (
            <div className="font-bold text-red-500 absolute top-[-8px] right-[-8px] w-6 h-6 flex justify-center items-center rounded-full text-sm bg-white border border-black">
              {state?.cart?.cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)}
            </div>
          )}

          {state?.cart.cartItems &&
            visibleCart &&
            (state?.cart.cartItems.length > 0 ? (
              <div className="absolute top-100 right-0 w-96 bg-slate-100 px-2 py-2 rounded-md">
                {state?.cart.cartItems.map((item, index) => (
                  <div className="flex justify-between px-2 py-2" key={index}>
                    <Image
                      width={60}
                      height={60}
                      src={item?.images[0]?.image}
                      alt={item?.images[0]?.image}
                      className="rounded-sm"
                    />
                    <div className="w-[280px] flex items-center flex-wrap">
                      <div className="truncate">{item.name}</div>

                      <div className="flex justify-between items-center w-full">
                        <div>
                          ${item.price}&nbsp;&nbsp;x&nbsp;&nbsp;{item.qty}
                        </div>
                        <div>${item.price * item.qty}</div>
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
            ) : (
              <div className="header__cart__items__empty">BAG IS EMPTY</div>
            ))}
        </Link>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {/* <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button> */}

            <Link href="/profile" className="flex items-center justify-center">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
              &nbsp;{session?.user.name}
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        <Link href="/cart" className="relative mr-6">
          <ShoppingBagIcon className="h-8 w-8" />
          <div className="font-bold text-red-500 absolute top-[-8px] right-[-8px] w-6 h-6 flex justify-center items-center rounded-full text-sm bg-white border border-black">
            {state?.cart?.cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)}
          </div>
        </Link>
        {session?.user ? (
          <div className="flex items-center justify-center">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
