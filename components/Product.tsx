import Link from "next/link";
import ProductImage from "./ProductImage";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
function Product({ product }: any) {
  return (
    <Link
      href={`/product/${product._id}`}
      className="h-96 flex flex-col p-5 rounded border group hover:scale-105 transition-transform ease-out duration-200"
    >
      <div className="relative max-h-72 flex-1">
        <ProductImage product={product} fill />
      </div>

      <div className="font-semibold flex items-center justify-between mt-4 mb-1">
        <p className="truncate">{product.name}</p>
      </div>
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

      <p className="italic text-xs w-64 line-clamp-2 text-gray-600">
        {product.description}
      </p>
    </Link>
  );
}

export default Product;
