import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const products = await Product.find({});
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};

export const POST = async (request) => {
  //   const { userId, prompt, tag } = await request.json();
  try {
    await connectToDB();
    const newProduct = new Product({
      name: "Test",
      slug: "test",
      category: "test",
      images: [],
      price: 10000,
      rating: 5,
      numReviews: 5,
      countInStock: 1,
      description: "test",
    });

    await newProduct.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};
