"use client"
import React from 'react'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
export default function DocumentationPage() {
  return (
    <div>
      <BackgroundBeamsWithCollision>
          <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 text-primary">📘 Inventra – User Guide</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">What is Inventra?</h2>
          <p className="text-gray-700">
            Inventra is a lightweight and user-friendly inventory management system that allows businesses and individuals to efficiently manage their stock, track item quantities, and maintain detailed records.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Core Features</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Add, update, or delete inventory items with ease</li>
            <li>Track quantities, pricing, and images</li>
            <li>User authentication (Login / Signup)</li>
            <li>Personalized dashboards with your saved items</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <ol className="list-decimal pl-6 text-gray-700">
            <li>Go to <code className="bg-gray-100 px-1 rounded">/signup</code> and create an account</li>
            <li>Verify your email if required</li>
            <li>Log in and access your dashboard</li>
          </ol>
        </section>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6 text-primary">🧭 Navigating the Dashboard</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">1. Add a New Inventory Item</h3>
          <p className="text-gray-700">
            Use the <strong>"Add Item"</strong> button to create a new entry. You can upload an image, enter title, quantity, and price.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">2. View & Edit Items</h3>
          <p className="text-gray-700">
            All your items appear in a clean grid. Click an item to view full details or edit/delete it.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">3. User Actions</h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Logout securely from the top right corner</li>
            <li>Update your account details from your profile</li>
          </ul>
        </section>

        <div className="mt-12 text-center text-sm text-gray-500">
          Need help? Contact us at <a href="mailto:support@inventra.app" className="text-primary-600 hover:underline">support@inventra.app</a>
        </div>
      </div>
      </BackgroundBeamsWithCollision>
      
    </div>
  )
}

