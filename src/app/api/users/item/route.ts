import { NextRequest,NextResponse } from "next/server";
import connect from "@/dbconnect/connectDb";
import User from "../../../../../models/userModel";

connect();

export async function POST(request:NextRequest) {
  try {
    const reqBody=await request.json()
    const {id:itemId}=reqBody
    console.log("Received itemId:", itemId);
    //findthe user based on the 
    const user=await User.findOne({ "inventory._id": itemId });
    if (!user) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    // .id we are using is an syntax in mongoose to find an id 
    const item = user.inventory.id(itemId);
    return NextResponse.json({ item });
  } 
   catch (error) {
    console.error("Error finding item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

