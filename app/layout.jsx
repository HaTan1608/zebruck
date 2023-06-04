import Header from "@/components/Header.jsx";
import "./globals.css";

import { Montserrat } from "next/font/google";
import Provider from "@/components/Provider";
import { CartContextProvider } from "@/context/cart.context";
export const metadata = {
  title: "Zebruck",
  description: "Zebruck, Starbuck items shop",
  icons: {
    icon: "/logo.jpeg",
  },
};

// If loading a variable font, you don't need to specify the font weight >>> https://fonts.google.com/variablefonts
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className=" max-w-[1240px]  mx-auto ">
        <Provider>
          <CartContextProvider>
            <div className="main">
              <div className="gradient" />
            </div>
            <Header />
            {children}
          </CartContextProvider>
        </Provider>
      </body>
    </html>
  );
}
