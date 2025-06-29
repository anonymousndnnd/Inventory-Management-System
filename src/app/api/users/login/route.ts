import { NextRequest,NextResponse } from "next/server";
import connect from "@/dbconnect/connectDb";
import User from "../../../../../models/userModel";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect();

export async function POST(request:NextRequest){
  try {
    //requesting from body will be written as 
    const reqBody=await request.json()
    // console.log(reqBody)
    const {email,password}=reqBody

    const user=await User.findOne({email})

    if(!user){
      return NextResponse.json({error:"User Not Exists"},{status:400})
    }
    console.log("User Exists")
    const validPassword=await bcryptjs.compare(password,user.password)
    if(!validPassword){
      return NextResponse.json({error:"wrong Password entered"},{status:400})
    }
    await User.findOneAndUpdate({email},                     
      { $set: { isVerified: true } }, 
      { new: true }             // return updated user
    );
    const tokenPayload={
      id:user._id,
      username:user.username,
      email:user.email
    }
    const token=jwt.sign(tokenPayload,process.env.SECRET_KEY!,{expiresIn:'1d'})

    const response=NextResponse.json({
      message:"Logged in Successfully",
      success:true
    }, { status: 200 })
    response.cookies.set("token",token,{
      //In this place if we do true we cannot access the cookie from frontend ,further i have to solve this problem
      httpOnly:false
    })
    return response;
  } 
  catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}