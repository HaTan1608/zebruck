import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t-neutral-500 border flex items-center px-2 md:px-6 py-4 justify-between w-full  z-50 shadow max-w-[1240px]  mx-auto">
      <div className="w-full flex justify-center items-center flex-wrap">
        <h4 className="w-full font-bold text-center text-lg">Zebrucks</h4>
        <div className="w-full  text-center">
          We have all products of Starbuck
        </div>
        <div className="w-full flex items-center justify-center">
          Contact:&nbsp;
          <a href="https://facebook.com" target="_blank">
            <Image
              src="/assets/images/facebook.png"
              alt="logo"
              width={30}
              height={30}
              sizes="(max-width: 768px) 100vw"
              className="object-contain"
            />
          </a>
          &nbsp;&nbsp;
          <a href="https://facebook.com" target="_blank">
            <Image
              src="/assets/images/zalo-icon.png"
              alt="logo"
              width={30}
              height={30}
              sizes="(max-width: 768px) 100vw"
              className="object-contain"
            />
          </a>
        </div>
        <div className="w-full  text-center">Phone: 093 891 71 21</div>
      </div>
    </footer>
  );
};

export default Footer;
