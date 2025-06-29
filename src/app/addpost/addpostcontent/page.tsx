"use client";
import { useState } from "react";
import axios from "axios";

import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function AddPostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";
  const imageid = searchParams.get("id");
  console.log(imageid)

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [item, setItem] = useState({
    image: "",
    title: "",
    amount: "",
    quantity: ""
  });

  // HandleImageChange->revision
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
        // Adding a new item
        await axios.post("/api/users/additem", item);
        toast.success("Item added to inventory!");
        router.push("/profile");
    }
     catch (error: unknown) {
        const errorMessage = isEdit ? "Failed to update item" : "Failed to add item";
        toast.error(errorMessage);

        if (error instanceof Error) {
          console.error(`${errorMessage}:`, error.message);
          // Optional: Show more specific error if available
          if ('response' in error && typeof error.response === 'object' && error.response !== null) {
            const serverError = (error.response as { data?: { message?: string } })?.data?.message;
            if (serverError) {
              toast.error(serverError);
            }
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }finally {
      setLoading(false);
      }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-black/90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isEdit ? "Edit Item" : "Add Inventory Item"}
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
            {loading ? ( "Adding...") : ("Add Item")}
          </button>
        </div>
      </div>
    </div>
  );
}