import { NextRequest,NextResponse } from "next/server";
import connect from "@/dbconnect/connectDb";
import User from "../../../../../models/userModel";



connect();

interface InventoryItem {
  _id: string,
  image: string;
  title: string;
  amount: number;
  quantity: number;
}

export async function POST(request:NextRequest){
  try {
    const reqBody=await request.json()
    const {id:itemId}=reqBody
    const user=await User.findOne({ "inventory._id": itemId });
    if (!user) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    
    user.inventory = (user.inventory as InventoryItem[]).filter(item => item._id.toString() !== itemId);
    await user.save();
     return NextResponse.json({ message: "Item deleted successfully" });
    
  } catch (error) {
      console.error("Error deleting item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}