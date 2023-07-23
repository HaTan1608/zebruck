import Order from "@/models/Order";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  console.log(request.cookies.get("cart")?.value);
  const body = await JSON.parse(request.cookies.get("cart")?.value);

  const newOrder = new Order({ ...body });

  try {
    await connectToDB();

    await newOrder.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
