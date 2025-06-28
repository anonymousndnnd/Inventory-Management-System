"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/moving-border";
export default function AboutPage() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center
     bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
    About Us
  </h1>
  <p className="text-lg text-gray-300 mb-8">
    We are on a mission to simplify inventory management for businesses of all sizes. 
    Our platform empowers teams to track, manage, and grow their operations with ease.
  </p>
  <Button borderRadius="1.5rem" className="dark:bg-green-500 dark:text-black">
    Learn More
  </Button>
</div>

<div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8 text-gray-300">
  {/* Our Story */}
  <div>
    <h2 className="text-2xl font-semibold text-white mb-4">Our Story</h2>
    <p>
      Inventra was founded with the vision of making inventory systems intuitive and accessible. 
      What started as a side project has now helped over 1,000 businesses manage their stock.
    </p>
  </div>

  {/* What We Do */}
  <div>
    <h2 className="text-2xl font-semibold text-white mb-4">What We Do</h2>
    <p>
      We provide a suite of tools that include inventory tracking, analytics, 
      real-time alerts, and integration with existing workflows—all in one sleek dashboard.
    </p>
  </div>

  {/* Our Values */}
  <div>
    <h2 className="text-2xl font-semibold text-white mb-4">Our Values</h2>
    <ul className="list-disc pl-5 space-y-2">
      <li>Transparency & trust</li>
      <li>Customer-first approach</li>
      <li>Continual improvement</li>
      <li>Simple yet powerful solutions</li>
    </ul>
  </div>

  {/* Get in Touch */}
  <div>
    <h2 className="text-2xl font-semibold text-white mb-4">Get in Touch</h2>
    <p>
      Want to collaborate or have questions? Reach out to us at{" "}
      <a
        className="underline text-white hover:text-blue-400 transition-colors"
        href="mailto:contact@inventra.io"
      >
        contact@inventra.io
      </a>.
    </p>
  </div>
</div>
    </div>
  )
}

