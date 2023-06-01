import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  //   const { userId, prompt, tag } = await request.json();
  try {
    await connectToDB();
    const newProduct = new Product({
      name: "Starbucks Studded x Disney Mickey Silver Chrome 710ml",
      slug: "test7",
      category: "Cup",
      images: [
        {
          image:
            "https://vn-test-11.slatic.net/p/a6a0acd96857a753dad3f19137ccfed9.jpg",
        },
      ],
      price: 10000,
      rating: 5,
      numReviews: 5,
      countInStock: 1,
      description: "test",
    });

    await newProduct.save();
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
