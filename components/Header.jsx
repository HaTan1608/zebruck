"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full bg-white z-50 shadow">
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
      <div className="sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/cart" className="relative">
              <ShoppingBagIcon className="h-8 w-8" />
              <div className="font-bold text-red-500 absolute top-[-8px] right-[-8px] w-6 h-6 flex justify-center items-center rounded-full text-sm bg-white border border-black">
                1
              </div>
            </Link>

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
        {session?.user ? (
          <div className="flex">
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
