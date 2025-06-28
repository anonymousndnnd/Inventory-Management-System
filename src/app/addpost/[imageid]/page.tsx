'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function updateItemPage(){
  const { imageid } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const [item, setItem] = useState({
      image: "",
      title: "",
      amount: "",
      quantity: ""
    });
  const router = useRouter();

  useEffect(() => {
      const fetchItem = async () => {
        try {
          const response = await axios.post('/api/users/item', {
            id: imageid,
          });
          setItem(response.data.item);
          setPreview(response.data.item.image);
        } catch (err: any) {
          console.error('Failed to fetch item:', err);
        } finally {
          setLoading(false);
        }
      };
  
      if (imageid) fetchItem();
    }, [imageid]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setItem({ ...item, image: base64 });
        setPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
      try {
        setLoading(true);
  
          // Updating an  existing item
          await axios.post("/api/users/updateitem", {
            id: imageid,
            ...item,
          });
          router.push("/profile");
          toast.success("Item updated successfully!");
          
        }
        catch (error) {
        toast.error( "Failed to update item");
        console.error(error);
      } finally {
        setLoading(false);
      }
        
      }

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700 px-4">
      <div className="bg-black/90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Item
        </h1>

        <div className="space-y-4">
          {/* Image File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 rounded-md h-32 object-cover w-full"
              />
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={item.title}
              onChange={(e) => setItem({ ...item, title: e.target.value })}
              placeholder="Item title"
              className="w-full mt-1 px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={item.amount}
              onChange={(e) => setItem({ ...item, amount: e.target.value })}
              placeholder="100"
              className="w-full mt-1 px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => setItem({ ...item, quantity: e.target.value })}
              placeholder="1"
              className="w-full mt-1 px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? ( "Updating..." ) : "Update Item"}
          </button>
        </div>
      </div>
    </div>
  );
}