import Link from "next/link";
import ProductImage from "./ProductImage";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { CartContext } from "@/context/cart.context";
import React, { useContext } from "react";
function Product({ product }: any) {
  const { state, dispatch } = useContext(CartContext);
  return (
    <div className="h-96 flex flex-col p-5 rounded border border-white group hover:scale-105 transition-transform ease-out duration-200 bg-white">
      <Link
        href={`/product/${product._id}`}
        className="relative max-h-72 flex-1"
      >
        <ProductImage product={product} fill />
      </Link>

      <Link
        href={`/product/${product._id}`}
        className="font-semibold flex items-center justify-between mt-4 mb-1"
      >
        <p className="truncate">{product.name}</p>
      </Link>
      <div className="font-semibold flex items-center justify-between mb-1">
        <p>${product.price}</p>
        <div className="flex items-center text-sm">
          {product?.rating && (
            <div className="flex items-center  mr-2">
              {/* Display 5 stars but display the rate ones as StarIconOutline  */}
              {Array.from({ length: Math.floor(product.rating) }, (_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
              ))}

              {/* Display the rest of the stars as StarIconOutline  */}
              {Array.from(
                { length: 5 - Math.floor(product.rating) },
                (_, i) => (
                  <StarIconOutline
                    key={i}
                    className="h-4 w-4 text-yellow-500"
                  />
                )
              )}
            </div>
          )}
          (<p>{product?.numReviews}</p>)
        </div>
      </div>
      <p
        className="italic text-xs  line-clamp-2 text-gray-600 mb-1"
        onClick={() => console.log(state)}
      >
        {product.description}
      </p>

      <div className="space-y-3 text-sm">
        <button
          onClick={() => dispatch({ type: "CART_ADD_ITEM", payload: product })}
          className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  );
}

export default Product;
