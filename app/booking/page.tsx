"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

export default function BookingInvoice() {
  const router = useRouter()
  const searchParams = useSearchParams()
 
  const [carData, setCarData] = useState({
    name: "",
    image: "",
    price: 0,
    features: [] as string[],
    category: "",
    pickupLocation: "",
    dropLocation: "",
    date: "",
    returnDate: "",
    time: "",
    tripType: "oneWay",
    distance: "0",
    days: "0"
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  })

  useEffect(() => {
    // Get car data from URL parameters
    const name = searchParams.get('name') || ""
    const image = searchParams.get('image') || "/images/sedan-premium.jpg"
    const price = Number(searchParams.get('price')) || 0
    const features = searchParams.get('features')?.split(',') || []
    const category = searchParams.get('category') || ""
    const pickupLocation = searchParams.get('pickupLocation') || ""
    const dropLocation = searchParams.get('dropLocation') || ""
    const date = searchParams.get('date') || ""
    const returnDate = searchParams.get('returnDate') || ""
    const time = searchParams.get('time') || ""
    const tripType = searchParams.get('tripType') || "oneWay"
    const distance = searchParams.get('distance') || "0"
    const days = searchParams.get('days') || "0"

    setCarData({
      name,
      image,
      price,
      features,
      category,
      pickupLocation,
      dropLocation,
      date,
      returnDate,
      time,
      tripType,
      distance,
      days
    })
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle booking submission
    console.log("Booking submitted:", formData)
  }

  // Calculate charges
  const serviceCharge = Math.round(carData.price * 0.05) // 5% service charge
  const gst = Math.round((carData.price + serviceCharge) * 0.18) // 18% GST
  const totalAmount = carData.price + serviceCharge + gst

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
            Booking Invoice
          </h1>
          <p className="mt-4 text-gray-600 text-lg">Complete your booking details below</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Car Details */}
            <div className="p-8 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-white">Cab Information</h2>
               
                <div className="space-y-6">
                  <div className="flex justify-center mb-10">
                    <div className="w-72 h-56 relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                      {carData.image ? (
                        <Image
                          src={carData.image}
                          alt={carData.name || "Car Image"}
                          fill
                          className="object-cover"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-400">No image available</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-blue-200 text-sm">Model Type</p>
                      <p className="font-semibold text-lg">{carData.category}</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-blue-200 text-sm">Seats</p>
                      <p className="font-semibold text-lg">4+1</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-blue-200 text-sm">Fuel Type</p>
                      <p className="font-semibold text-lg">CNG-Diesel</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                      <p className="text-blue-200 text-sm">Availability</p>
                      <p className="font-semibold text-lg">Available</p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6 mt-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-200">Price:</span>
                        <span className="font-semibold text-xl">₹{carData.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-200">Service Charge:</span>
                        <span className="font-semibold text-xl">₹{serviceCharge}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-200">GST:</span>
                        <span className="font-semibold text-xl">₹{gst}</span>
                      </div>
                      <div className="flex justify-between items-center text-2xl mt-6 pt-6 border-t border-white/20">
                        <span className="font-bold">Total Amount:</span>
                        <span className="font-bold text-3xl">₹{totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Trip Details & Form */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Trip Information</h2>
             
              <div className="space-y-6 mb-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium text-gray-800 text-lg">{carData.pickupLocation}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Drop Location</p>
                    <p className="font-medium text-gray-800 text-lg">{carData.dropLocation}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-800 text-lg">{carData.date}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Return Date</p>
                    <p className="font-medium text-gray-800 text-lg">{carData.returnDate}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-800 text-lg">{carData.time}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Trip Type</p>
                    <p className="font-medium text-gray-800 text-lg">{carData.tripType}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Distance</p>
                    <p className="font-medium text-gray-800 text-lg">{carData.distance} km</p>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            By clicking "Book Now" you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Terms and Conditions</a>
            {" "}and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
} 