import Order from "@/models/Order";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  let a = request.cookies.get("cart")?.value;
  console.log(JSON.parse(a));
  const body = await request.cookies;

  const newPost = new Order(body);

  try {
    await connectToDB();

    await newPost.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
