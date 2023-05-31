import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  //   const { userId, prompt, tag } = await request.json();
  try {
    await connectToDB();
    const newProduct = new Product({
      name: "Test3",
      slug: "test3",
      category: "test",
      images: [],
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
