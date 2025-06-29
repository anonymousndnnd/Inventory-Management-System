"use client";
import { Suspense } from "react";
import AddPostContent from "./addpostcontent/page";

export default function AddPostPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading Add Post Page...</div>}>
      <AddPostContent />
    </Suspense>
  );
}