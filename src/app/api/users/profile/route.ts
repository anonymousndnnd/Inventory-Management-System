import { NextRequest,NextResponse } from "next/server";
import connect from "@/dbconnect/connectDb";
import User from "../../../../../models/userModel";
import jwt from "jsonwebtoken"


connect();

export async function POST(request:NextRequest) {
  try {
    const token=request.cookies.get("token")?.value
    console.log(token)
    if(!token) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }
    const decodedToken=jwt.verify(token,process.env.SECRET_KEY!) as jwt.JwtPayload;
    console.log("Decoded Token is:",decodedToken)
    const user=await User.findOne({_id:decodedToken.id}).select("-password")
    console.log("User is",user)
    if(!user){
      return NextResponse.json({message:"Invalid token"},{status:400})
    }
    return NextResponse.json({
      message:"User Found",
      data:user
    })
  } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

