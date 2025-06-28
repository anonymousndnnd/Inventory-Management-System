import { NextRequest,NextResponse } from "next/server";
import connect from "@/dbconnect/connectDb";
import jwt from "jsonwebtoken";
import User from "../../../../../models/userModel";


connect();


export async function GET(request:NextRequest){
  try {
    const token=request.cookies.get("token")?.value || ""
    console.log("Token is ",token)
    if (!token) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }
    
    const decodedToken:any=jwt.verify(token,process.env.SECRET_KEY!)
    console.log(decodedToken)
    await User.findByIdAndUpdate(decodedToken.id, {
      $set: { isVerified: false }
    });
    const response=NextResponse.json({
      
      message:"Logout Successfully",
      success:true
    })

    response.cookies.set("token","",{
      httpOnly:true,
      expires:new Date(0)
    })

    return response;
  } catch (error: any) {
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}