"use client";
import { Suspense } from "react";
import AddPostContent from "./AddPostContent"

export default function AddPostPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading Add Post Page...</div>}>
      <AddPostContent />
    </Suspense>
  );
}