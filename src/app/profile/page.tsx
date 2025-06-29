"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Card,

  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface InventoryItem {
  _id: string;
  title: string;
  amount: number;
  quantity: number;
  image: string;
}

interface UserData {
  username: string;
  email?: string;
  inventory: InventoryItem[];
}

export default function ProfilePage() {
  const [user, setUser] =  useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post("/api/users/profile");
        setUser(response.data.data);
      } catch (error) {
        console.log("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
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
        <p className="text-blue-700 font-medium">Fetching Items...</p>
      </div>
    </div>
  );
}
  const addButton = () => {
    router.push("/addpost");
  };

  return (
    <div className="relative min-h-screen">
      {/* 🔹 Background Grid Layer */}
      <div
        className={cn(
          "absolute inset-0 z-[-2]",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      {/* 🔸 Radial Fade Mask */}
      <div className="absolute inset-0 z-[-1] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      {/* 🔹 Main Content */}
      <div className="relative z-10 px-6 py-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          {user && (
            <h2 className="text-lg font-medium text-gray-700">
              Welcome, <span className="font-semibold">{user.username}</span>
            </h2>
          )}
        </div>

        {/* Main Content */}
        <div className="text-center">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : user ? (
            <>
              {user.inventory.length === 0 ? (
                <button
                  onClick={addButton}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Add Items
                </button>
              ) : (
                <>
                  <div className="flex justify-end mb-6">
                    <button
                      onClick={addButton}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Add More Items
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {user.inventory.map((item: any, index: number) => (
                      <Card
                      key={index}
                      onClick={() => router.push(`/profile/${item._id}`)}
                      className="cursor-pointer bg-blue/80 backdrop-blur border border-slate-200 hover:shadow-xl hover:border-slate-300 transform hover:scale-[1.02] transition-all duration-200 rounded-2xl overflow-hidden"
                    >
                      <CardContent className="p-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-t-2xl shadow-sm"
                        />
                      </CardContent>

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
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-red-500">Could not load user info.</p>
          )}
        </div>
      </div>
    </div>
  );
}
