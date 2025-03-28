"use client"

import type React from "react"

import { useState } from "react"

export default function BookingForm() {
  const [tripType, setTripType] = useState("oneWay")
  const [fromCity, setFromCity] = useState("")
  const [toCity, setToCity] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [travellers, setTravellers] = useState("1")
  const [fareType, setFareType] = useState("regular")

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  const handleExchange = () => {
    const temp = fromCity
    setFromCity(toCity)
    setToCity(temp)
  }

  const handleTripTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripType(e.target.value)
    // We no longer reset return date when switching to one-way
  }

  const handleDepartureDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    setDepartureDate(selectedDate)
    // If return date is before new departure date, update it
    if (returnDate && returnDate < selectedDate) {
      setReturnDate(selectedDate)
    }
  }

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    if (!departureDate) {
      // If no departure date is set, just ensure it's not before today
      if (selectedDate >= today) {
        setReturnDate(selectedDate)
      }
    } else {
      // If departure date is set, ensure return date is not before it
      if (selectedDate >= departureDate) {
        setReturnDate(selectedDate)
      }
    }
  }

  const openDatePicker = (id: string) => {
    const dateInput = document.getElementById(id) as HTMLInputElement
    if (dateInput) {
      try {
        if (typeof dateInput.showPicker === "function") {
          dateInput.showPicker()
        }
      } catch (error) {
        console.log("Date picker not supported in this browser")
      }
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-8 mb-6">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="oneWay"
              checked={tripType === "oneWay"}
              onChange={handleTripTypeChange}
              className="form-radio text-blue-500"
            />
            <span className="ml-2 text-white">One Way</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="roundTrip"
              checked={tripType === "roundTrip"}
              onChange={handleTripTypeChange}
              className="form-radio text-blue-500"
            />
            <span className="ml-2 text-white">Round Trip</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="multiCity"
              checked={tripType === "multiCity"}
              onChange={handleTripTypeChange}
              className="form-radio text-blue-500"
            />
            <span className="ml-2 text-white">Multi City</span>
          </label>
        </div>
        <span className="text-white">Book International and Domestic Flights</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">From</label>
            <input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Enter city"
              className="w-full p-2 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
            />
          </div>

          <div className="flex items-center justify-center">
            <button type="button" onClick={handleExchange} className="p-2 rounded-full hover:bg-white/10 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">To</label>
            <input
              type="text"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="Enter city"
              className="w-full p-2 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">Departure</label>
            <div className="relative">
              <input
                type="date"
                value={departureDate}
                onChange={handleDepartureDateChange}
                min={today}
                className="w-full p-2 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white [&::-webkit-calendar-picker-indicator]:opacity-0"
                id="departureDate"
              />
              <button
                type="button"
                onClick={() => openDatePicker("departureDate")}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-white hover:bg-white/10 rounded-r"
                aria-label="Open departure date calendar"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-white mb-1">Return</label>
            <div className="relative">
              <input
                type="date"
                value={returnDate}
                onChange={handleReturnDateChange}
                min={departureDate || today}
                className="w-full p-2 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white [&::-webkit-calendar-picker-indicator]:opacity-0"
                id="returnDate"
              />
              <button
                type="button"
                onClick={() => openDatePicker("returnDate")}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-white hover:bg-white/10 rounded-r disabled:opacity-50 disabled:hover:bg-transparent"
                aria-label="Open return date calendar"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Travellers & Class</label>
            <div className="relative">
              <select
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className="w-full p-2 pr-10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white appearance-none"
              >
                <option value="1" className="bg-gray-800 text-white">
                  1 Traveller, Economy
                </option>
                <option value="2" className="bg-gray-800 text-white">
                  2 Travellers, Economy
                </option>
                <option value="3" className="bg-gray-800 text-white">
                  3 Travellers, Economy
                </option>
                <option value="4" className="bg-gray-800 text-white">
                  4 Travellers, Economy
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-medium text-white">Select a special fare</p>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center p-3 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 bg-white/20">
              <input
                type="radio"
                name="fareType"
                value="regular"
                checked={fareType === "regular"}
                onChange={(e) => setFareType(e.target.value)}
                className="form-radio text-blue-500"
              />
              <div className="ml-2">
                <p className="font-medium text-white">Regular</p>
                <p className="text-sm text-white/70">Regular fares</p>
              </div>
            </label>
            <label className="flex items-center p-3 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 bg-white/20">
              <input
                type="radio"
                name="fareType"
                value="student"
                checked={fareType === "student"}
                onChange={(e) => setFareType(e.target.value)}
                className="form-radio text-blue-500"
              />
              <div className="ml-2">
                <p className="font-medium text-white">Student</p>
                <p className="text-sm text-white/70">Extra discounts/baggage</p>
              </div>
            </label>
            <label className="flex items-center p-3 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 bg-white/20">
              <input
                type="radio"
                name="fareType"
                value="seniorCitizen"
                checked={fareType === "seniorCitizen"}
                onChange={(e) => setFareType(e.target.value)}
                className="form-radio text-blue-500"
              />
              <div className="ml-2">
                <p className="font-medium text-white">Senior Citizen</p>
                <p className="text-sm text-white/70">Up to ₹600 off</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-12 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  )
}

