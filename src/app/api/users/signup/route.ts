import { NextRequest,NextResponse } from "next/server";
import connect from "@/dbconnect/connectDb";
import User from "../../../../../models/userModel";
import bcryptjs from "bcryptjs"

connect();


export async function POST(request:NextRequest){
  try {
    //requesting from body willbe written as 
    const reqBody=await request.json()
    // console.log(reqBody)
    const {username,email,password}=reqBody

    const user=await User.findOne({email})

    if(user){
      return NextResponse.json({error:"User already Exists"},{status:400})
    }
    const salt=await bcryptjs.genSalt(10);
    const hashedPassword=await bcryptjs.hash(password,salt)
    
    //now create user in Your Database
    const newUser=new User({
      username,
      email,
      password:hashedPassword
    })
    const savedUser=await newUser.save();
    // console.log("Saved User is:",savedUser)
    return NextResponse.json({
      message:"User Registered Successfully",
      success:true,
      savedUser
    })

  } catch (error) {
    console.error("POST /register error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}