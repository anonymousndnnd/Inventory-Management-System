import { NextRequest,NextResponse } from "next/server";
import connect from "@/dbconnect/connectDb";
import User from "../../../../../models/userModel";
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest) {
  try {
    const reqBody=await request.json()
    const {image,title,amount,quantity}=reqBody

    // one more verification of user 
    const token=request.cookies.get("token")?.value || ""
    const decodedToken=jwt.verify(token,process.env.SECRET_KEY!)  as jwt.JwtPayload;
    const userid=decodedToken.id
    const user = await User.findById(userid);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    user.inventory.push(user.inventory.create({ image, title, amount, quantity }));
    await user.save();
    return NextResponse.json({ message: "Item added to inventory" }, { status: 200 });

  } catch (error) {
    console.error("Error adding inventory item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}