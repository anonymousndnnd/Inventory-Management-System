'use client';

import {
  Card,
  
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Item {
  _id: string;
  title: string;
  amount: number;
  quantity: number;
  image: string;
}

export default function ItemPage() {
  const { imageid } = useParams(); 
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();



  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/users/item', {
          id: imageid,
        });
        setItem(response.data.item);
      } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Operation failed';
      setError(errorMessage);
      toast.error(errorMessage);
    }finally {
        setLoading(false);
      }
    };

    if (imageid) fetchItem();
  }, [imageid]);
  const deleteItem=async()=>{
    try {
      setDeleting(true)
          await axios.post('/api/users/deleteitem', {
          id: imageid,
        });
        toast.success("Item Deleted Successfully");
        router.push("/profile");

    } catch (error: unknown) {
      toast.error("Failed to delete Item");
      
      if (error instanceof Error) {
        console.error('Failed to delete item:', error.message);
        setError(error.message);
      } else {
        console.error('Failed to delete item:', error);
        setError('Something went wrong');
      }
    }
    finally{
      setDeleting(false)
    }
  }
if (loading || deleting) {
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
        <p className="text-blue-700 font-medium">{loading?("Loading..."):("Deleting...")}</p>
      </div>
    </div>
  );
}
  const handleEdit = async() => {
   
    router.push(`/addpost/${imageid}`);

  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Item Details</h1>
      {item ? (
        <Card className="relative bg-blue/80 backdrop-blur border border-slate-200 hover:shadow-xl hover:border-slate-300 transform hover:scale-[1.02] transition-all duration-200 rounded-2xl overflow-hidden w-full max-w-md">
          {/* Edit/Delete Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 z-10">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition text-sm shadow-sm"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition text-sm shadow-sm"
              onClick={deleteItem}
            >
              Delete
            </button>
          </div>

          {/* Image */}
          <CardContent className="p-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-t-2xl shadow-sm"
            />
          </CardContent>

          {/* Content */}
          <CardHeader className="px-5 py-4 bg-blue/60 backdrop-blur-sm">
            <CardTitle className="text-lg font-semibold text-gray-800 mb-1">
              {item.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              ₹ {item.amount}
            </CardDescription>
            <div className="mt-1 text-sm text-indigo-600 font-medium">
              Quantity: {item.quantity}
            </div>
          </CardHeader>
        </Card>



      ) : (
        <p>Item not found.</p>
      )}
    </div>
  );
}
