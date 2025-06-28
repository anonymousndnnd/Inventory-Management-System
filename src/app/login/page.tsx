"use client"
import React, { useState } from 'react'
import {motion} from "framer-motion"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {Eye,EyeOff,Mail,Github} from "lucide-react"
import Link from 'next/link'
import {useRouter} from 'next/navigation';
import axios from 'axios';
import toast from "react-hot-toast";



export default function LoginPage() {
  const [loading,setLoading]=useState(false)
  const [user,setUser]=useState({
    email:"",
    password:"",
  
  })
  const router=useRouter();
  const [showPassword,setShowPassword]=useState(false);
  const onLogin=async()=>{
    try {
      //setLoading jab tak true rahegas button disable rahega 
      setLoading(true)
      const response=await axios.post("/api/users/login",user)
      toast.success("LoggedIn Successfully");
      console.log("Login success",response.data)
      // yaha router mein push karne se home route toh same rehta hai bss postfix mein jo hai wo change ho jaata hai 
      router.push("/profile")
    } catch (error:any) {
        toast.error("Failed to Login");
        console.log("Login Failed")  
    }
    finally{
      setLoading(false)
    }
  }
  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="flex flex-col items-center space-y-4">
        <svg className="animate-spin h-10 w-10 text-blue-600" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="text-blue-700 font-medium">Logging you in...</p>
      </div>
    </div>
  );
}
  return (
    
    <div className='min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4'>
      
      <motion.div
        initial={{opacity:0,y:-20}}
        transition={{duration:0.5}}
        animate={{opacity:1,y:0}}
        className='w-full max-w-md'
      >
        <div className='bg-white rounded-2xl shadow-xl p-8 space-y-6'>
          <div className='text-center space-y-2'>
            <h1 className='text-3xl font-bold tracking-tighter text-gray-800'>Welcome Back</h1>
            <p className='text-muted-foreground '>Enter your credentials to access your account</p>
          </div>
          <form className='space-y-4' onSubmit={(e) => {
            e.preventDefault(); 
            onLogin(); 
          }}>
              <div className='space-y-2'>
                <Label htmlFor='email' className="text-gray-600">Email</Label>
                <Input
                  id="email"
                  type='email'
                  placeholder='example@gmail.com'
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  className="border border-gray-400 text-gray-800"
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password' className="text-gray-600">Password</Label>
                <div className='relative'>
                  <Input
                  id="password"
                  type='password'
                  placeholder='enter your Password'
                  value={user.password}
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  className="border border-gray-400 text-gray-800"
                  />
                  <button onClick={()=>setShowPassword(!showPassword)}
                    type='submit'
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                    >
                    {showPassword ? <EyeOff size={20}/>:<Eye size={20}/>}
                  </button>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id="remember" className="border border-gray-400 rounded-sm"/>
                  <Label htmlFor='remember' className="text-gray-600 ">Remember me</Label>
                </div>
                <a href="/" className='text-sm text-gray-600  '>Forgot Password</a>
              </div>
              <Button type='submit' className='w-full mt-5'>{loading ? (
    <div className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Logging in...
    </div>
  ) : (
    "Sign In"
  )}</Button>
          </form>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t h-px bg-gray-400'/>
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-white px-2 text-muted-foreground text-gray-500'>
                Or continue with 
              </span>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Button variant="outline" className='w-full border border-gray-400 text-gray-800 hover:bg-gray-100'>
              <Github className='mr-2 h-4 w-4'/>
              Github
            </Button>
            <Button variant="outline" className='w-full border border-gray-400 text-gray-800 hover:bg-gray-100'>
              <Mail className='mr-2 h-4 w-4'/>
              Google
            </Button>
          </div>
          <div className='text-center text-sm text-gray-700'>
            Dont have an account?{""}
            <Link href="/signup" className="text-primary-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
        
      </motion.div>

    </div>
  )
}

