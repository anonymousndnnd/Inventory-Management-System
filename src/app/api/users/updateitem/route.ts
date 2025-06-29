import { NextRequest,NextResponse } from "next/server";
import connect from "@/dbconnect/connectDb";
import User from "../../../../../models/userModel";


connect()

export async function POST(request:NextRequest) {
  try {
    const reqBody=await request.json()
    const {image,title,amount,quantity,_id}=reqBody
    const user=await User.findOne({ "inventory._id": _id });
    if (!user) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    const item = user.inventory.id(_id);
    if (!item) {
      return NextResponse.json({ error: "Item not found in inventory" }, { status: 404 });
    }
    // Update fields
    item.image = image;
    item.title = title;
    item.amount = amount;
    item.quantity = quantity;
    await user.save();
    return NextResponse.json({ message: "Item Updated Successfully" }, { status: 200 });
  } catch (error) {
      console.error("Error adding inventory item:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

