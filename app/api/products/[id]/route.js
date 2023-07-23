import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    console.log(request, params);

    const product = await Product.findById(params.id);
    console.log(product);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
