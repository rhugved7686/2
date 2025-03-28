"use client"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SearchResults() {
  const [selectedCategory, setSelectedCategory] = useState("All Cars")
  
  const categories = [
    { name: "All Cars", count: null },
    { name: "Hatchback", count: 3 },
    { name: "Sedan", count: 4 },
    { name: "Sedan Premium", count: 3 },
    { name: "SUV", count: 2 },
    { name: "MUV", count: 1 }
  ]

  const cars = [
    {
      name: "Hatchback",
      image: "/images/hatchback-car.jpg",
      rating: 4.5,
      reviews: 48,
      features: ["4+1 Seater", "USB Charging", "Air Conditioning", "Music System"],
      price: 1776,
      discount: "13% OFF",
      category: "Hatchback"
    },
    {
      name: "Sedan",
      image: "/images/sedan-car.jpg",
      rating: 4.5,
      reviews: 48,
      features: ["4+1 Seater", "USB Charging", "Air Conditioning", "Music System"],
      price: 2664,
      discount: "13% OFF",
      category: "Sedan"
    },
    {
      name: "Sedan Premium",
      image: "/images/sedan-premium.jpg",
      rating: 4.5,
      reviews: 48,
      features: ["6+1 Seater", "USB Charging", "Air Conditioning", "Music System"],
      price: 3108,
      discount: "13% OFF",
      category: "Sedan"
    },
    {
      name: "SUV",
      image: "/images/suv.jpg",
      rating: 4.8,
      reviews: 56,
      features: ["6+1 Seater", "USB Charging", "Climate Control", "Premium Sound System"],
      price: 4500,
      discount: "10% OFF"
    },
    {
      name: "MUV",
      image: "/images/muv.jpg",
      rating: 4.7,
      reviews: 52,
      features: ["7+1 Seater", "USB Charging", "Climate Control", "Entertainment System"],
      price: 3800,
      discount: "12% OFF"
    }
  ]

  const filteredCars = selectedCategory === "All Cars" 
    ? cars 
    : cars.filter(car => car.category === selectedCategory)

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">Browse by Category</h1>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === category.name
                ? "bg-[#1a1f2e] text-white"
                : "bg-white text-[#1a1f2e] border-2 border-[#1a1f2e]"
              }`}
            >
              {category.name} {category.count && `(${category.count})`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  {car.discount}
                </span>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{car.name}</h3>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(car.rating))}
                      {"☆".repeat(5 - Math.floor(car.rating))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({car.reviews} reviews)</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {car.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-xl font-bold text-[#1a1f2e]">₹{car.price}</p>
                  </div>
                  <button className="bg-[#1a1f2e] text-white px-6 py-2 rounded hover:bg-[#1a1f2e]/90">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
} 