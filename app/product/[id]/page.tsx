import ProductImage from "@/components/ProductImage";
import { notFound } from "next/navigation";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonAdd from "@/components/ButtonAdd";
type Props = {
  params: {
    id: string;
  };
};
export async function generateMetadata({
  params: { id },
}: Props): Promise<any> {
  const res = await fetch(`https://www.zebrucks.com/api/products/${id}`);
  const product: any = await res.json();

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product?.images[0].image,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}
async function ProductPage({ params: { id } }: Props) {
  try {
    const res = await fetch(`https://www.zebrucks.com/api/products/${id}`);
    const product: any = await res.json();

    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-20 pb-10">
        <ProductImage product={product} />

        <div className="divide-y flex items-between flex-wrap">
          <div className="space-y-2 pb-8">
            <h1 className="text-2xl md:text-4xl font-bold">{product.name}</h1>
            <div className="flex items-center text-sm my-2">
              {product?.rating && (
                <div className="flex items-center  mr-2">
                  {/* Display 5 stars but display the rate ones as StarIconOutline  */}
                  {Array.from(
                    { length: Math.floor(product.rating) },
                    (_, i) => (
                      <StarIcon key={i} className="h-8 w-8 text-yellow-500" />
                    )
                  )}

                  {/* Display the rest of the stars as StarIconOutline  */}
                  {Array.from(
                    { length: 5 - Math.floor(product.rating) },
                    (_, i) => (
                      <StarIconOutline
                        key={i}
                        className="h-8 w-8 text-yellow-500"
                      />
                    )
                  )}
                </div>
              )}
              (<p>{product?.numReviews}</p>)
            </div>
            <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
              ${product.price}
            </h2>
            <p className="text-xs md:text-sm">{product.description}</p>
          </div>

         
          <div className="space-y-3 text-sm">
            <ButtonAdd product={product}/>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}

export default ProductPage;
