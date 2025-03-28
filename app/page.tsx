"use client"

import Image from "next/image"
import { useState } from "react"
import CabBookingForm from "./components/CabBookingForm"
import BusBookingForm from "./components/BusBookingForm"
import HotelBookingForm from "./components/HotelBookingForm"
import Navbar from "./components/Navbar"
import DestinationCard from "@/components/destination-card"
import CabCard from "@/components/cab-card"
import AppPromotion from "@/components/app-promotion"
import Footer from "@/components/footer"

export default function Home() {
  const [currentTab, setCurrentTab] = useState("cabs")
  const [bgImage, setBgImage] = useState("/images/vin.jpg")
  const [travellerSelections, setTravellerSelections] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: 'Economy/Premium Economy'
  })

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
    // Update background image based on tab
    switch (tab) {
      case 'flights':
        setBgImage("/images/flight.jpg")
        break
      case 'hotels':
        setBgImage("/images/hotel.jpg")
        break
      case 'buses':
        setBgImage("/images/bus.jpg")
        break
      case 'cabs':
        setBgImage("/images/vin.jpg")
        break
      case 'homestays':
        setBgImage("/images/villa.jpg")
        break
      case 'holiday':
        setBgImage("/images/holiday.jpg")
        break
      default:
        setBgImage("/background.jpg")
    }
  }

  const renderBookingForm = () => {
    switch (currentTab) {
      case 'flights':
        return (
          <form className="w-full max-w-6xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              {/* Trip Type Selection */}
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    defaultChecked
                    className="form-radio text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-white">One Way</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    className="form-radio text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-white">Round Trip</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="multi-city"
                    className="form-radio text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-white">Multi City</span>
                </label>
                <span className="ml-auto text-sm text-white">Book International and Domestic Flights</span>
              </div>

              {/* Location, Date, and Travellers Selection */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-white mb-1">From</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter city or airport"
                      className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
                      defaultValue="Delhi"
                    />
                    <div className="text-sm text-white/70 mt-1">DEL, Delhi Airport India</div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button type="button" className="p-2 rounded-full bg-white/20 hover:bg-white/30">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-white mb-1">To</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter city or airport"
                      className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
                      defaultValue="Mumbai"
                    />
                    <div className="text-sm text-white/70 mt-1">BOM, Chhatrapati Shivaji International</div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-white mb-1">Departure</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
                      defaultValue="26 Mar'25"
                      readOnly
                    />
                    <div className="text-sm text-white/70 mt-1">Wednesday</div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-white mb-1">Travellers & Class</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        const dropdown = document.getElementById('travellersDropdown');
                        const button = document.activeElement;
                        if (dropdown) {
                          const isHidden = dropdown.classList.toggle('hidden');
                          // Add visual cue to the button when dropdown is open
                          if (button instanceof HTMLElement) {
                            if (!isHidden) {
                              button.classList.add('ring-2', 'ring-blue-500', 'bg-white/30');
                            } else {
                              button.classList.remove('ring-2', 'ring-blue-500', 'bg-white/30');
                            }
                          }
                        }
                      }}
                      className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white text-left transition-all"
                    >
                      <div>{travellerSelections.adults + travellerSelections.children + travellerSelections.infants} Traveller{(travellerSelections.adults + travellerSelections.children + travellerSelections.infants) !== 1 ? 's' : ''}</div>
                      <div className="text-sm text-white/70 mt-1">{travellerSelections.travelClass}</div>
                    </button>

                    {/* Dropdown Panel */}
                    <div id="travellersDropdown" className="hidden absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-[100] w-[320px] max-h-[450px] overflow-y-auto">
                      <div className="p-4 space-y-4">
                        {/* Adults Section */}
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-medium text-gray-900">ADULTS (12y+)</div>
                              <div className="text-sm text-gray-500">on the day of travel</div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {[1,2,3,4,5,6,7,8,9,'>9'].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setTravellerSelections({
                                  ...travellerSelections,
                                  adults: typeof num === 'string' ? 9 : num
                                })}
                                className={`w-8 h-8 flex items-center justify-center rounded border ${num === travellerSelections.adults || (num === '>9' && travellerSelections.adults > 9) ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-700 hover:border-blue-500'}`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Children Section */}
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-medium text-gray-900">CHILDREN (2y-12y)</div>
                              <div className="text-sm text-gray-500">on the day of travel</div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {[0,1,2,3,4,5,6,'>6'].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setTravellerSelections({
                                  ...travellerSelections,
                                  children: typeof num === 'string' ? 6 : num
                                })}
                                className={`w-8 h-8 flex items-center justify-center rounded border ${num === travellerSelections.children || (num === '>6' && travellerSelections.children > 6) ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-700 hover:border-blue-500'}`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Infants Section */}
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-medium text-gray-900">INFANTS (below 2y)</div>
                              <div className="text-sm text-gray-500">on the day of travel</div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {[0,1,2,3,4,5,6,'>6'].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setTravellerSelections({
                                  ...travellerSelections,
                                  infants: typeof num === 'string' ? 6 : num
                                })}
                                className={`w-8 h-8 flex items-center justify-center rounded border ${num === travellerSelections.infants || (num === '>6' && travellerSelections.infants > 6) ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-700 hover:border-blue-500'}`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Travel Class Selection */}
                        <div>
                          <div className="font-medium text-gray-900 mb-3">CHOOSE TRAVEL CLASS</div>
                          <div className="space-y-2">
                            {[
                              'Economy/Premium Economy',
                              'Premium Economy',
                              'Business',
                              'First Class'
                            ].map((className) => (
                              <button
                                key={className}
                                type="button"
                                onClick={() => setTravellerSelections({
                                  ...travellerSelections,
                                  travelClass: className
                                })}
                                className={`w-full px-3 py-2 text-left rounded border ${className === travellerSelections.travelClass ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-700 hover:border-blue-500'}`}
                              >
                                {className}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Apply Button */}
                        <div className="flex justify-end pt-2 border-t">
                          <button
                            type="button"
                            className="bg-blue-500 text-white px-6 py-2 rounded font-medium hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                            onClick={() => {
                              // Add visual feedback when clicked
                              const applyButton = document.activeElement;
                              if (applyButton instanceof HTMLElement) {
                                applyButton.classList.add('bg-blue-700');
                                setTimeout(() => {
                                  applyButton.classList.remove('bg-blue-700');
                                  // Hide dropdown after button animation
                                  const dropdown = document.getElementById('travellersDropdown');
                                  if (dropdown) {
                                    dropdown.classList.add('hidden');
                                    
                                    // Find and reset the main button's visual state
                                    const mainButton = dropdown.parentElement?.querySelector('button:first-of-type');
                                    if (mainButton) {
                                      mainButton.classList.remove('ring-2', 'ring-blue-500', 'bg-white/30');
                                    }
                                  }
                                }, 200);
                              } else {
                                // If no active element, just hide dropdown
                                const dropdown = document.getElementById('travellersDropdown');
                                if (dropdown) {
                                  dropdown.classList.add('hidden');
                                  
                                  // Find and reset the main button's visual state
                                  const mainButton = dropdown.parentElement?.querySelector('button:first-of-type');
                                  if (mainButton) {
                                    mainButton.classList.remove('ring-2', 'ring-blue-500', 'bg-white/30');
                                  }
                                }
                              }
                            }}
                            aria-label="Apply traveller selections"
                          >
                            APPLY
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Fare Selection */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-white mr-2">Select a special fare</span>
                  <span className="px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded">EXTRA SAVINGS</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <label className="flex-1 min-w-[150px] p-3 border border-white/20 rounded-lg cursor-pointer bg-white/20 hover:bg-white/30">
                    <div className="flex items-start space-x-3">
                      <input 
                        type="radio" 
                        name="fare" 
                        value="regular" 
                        defaultChecked 
                        className="mt-1.5 form-radio text-blue-500 focus:ring-blue-500 border-white/50" 
                      />
                      <div>
                        <div className="text-white font-medium">Regular</div>
                        <div className="text-sm text-white/70">Regular fares</div>
                      </div>
                    </div>
                  </label>
                  <label className="flex-1 min-w-[150px] p-3 border border-white/20 rounded-lg cursor-pointer bg-white/20 hover:bg-white/30">
                    <div className="flex items-start space-x-3">
                      <input 
                        type="radio" 
                        name="fare" 
                        value="student" 
                        className="mt-1.5 form-radio text-blue-500 focus:ring-blue-500 border-white/50" 
                      />
                      <div>
                        <div className="text-white font-medium">Student</div>
                        <div className="text-sm text-white/70">Extra discounts/baggage</div>
                      </div>
                    </div>
                  </label>
                  <label className="flex-1 min-w-[150px] p-3 border border-white/20 rounded-lg cursor-pointer bg-white/20 hover:bg-white/30">
                    <div className="flex items-start space-x-3">
                      <input 
                        type="radio" 
                        name="fare" 
                        value="senior" 
                        className="mt-1.5 form-radio text-blue-500 focus:ring-blue-500 border-white/50" 
                      />
                      <div>
                        <div className="text-white font-medium">Senior Citizen</div>
                        <div className="text-sm text-white/70">Up to ₹ 600 off</div>
                      </div>
                    </div>
                  </label>
                  <label className="flex-1 min-w-[150px] p-3 border border-white/20 rounded-lg cursor-pointer bg-white/20 hover:bg-white/30">
                    <div className="flex items-start space-x-3">
                      <input 
                        type="radio" 
                        name="fare" 
                        value="armed" 
                        className="mt-1.5 form-radio text-blue-500 focus:ring-blue-500 border-white/50" 
                      />
                      <div>
                        <div className="text-white font-medium">Armed Forces</div>
                        <div className="text-sm text-white/70">Up to ₹ 600 off</div>
                      </div>
                    </div>
                  </label>
                  <label className="flex-1 min-w-[150px] p-3 border border-white/20 rounded-lg cursor-pointer bg-white/20 hover:bg-white/30">
                    <div className="flex items-start space-x-3">
                      <input 
                        type="radio" 
                        name="fare" 
                        value="medical" 
                        className="mt-1.5 form-radio text-blue-500 focus:ring-blue-500 border-white/50" 
                      />
                      <div>
                        <div className="text-white font-medium">Doctor and Nurses</div>
                        <div className="text-sm text-white/70">Up to ₹ 600 off</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-12 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  SEARCH
                </button>
              </div>
            </div>
          </form>
        )
      case 'hotels':
        return <HotelBookingForm />
      case 'homestays':
        return (
          <form className="w-full max-w-6xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* City/Property Input */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-white mb-1">City, Property Name Or Location</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter city or property"
                    className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white placeholder-white/70"
                    defaultValue="Delhi"
                  />
                  <div className="text-xl font-bold text-white mt-1">Delhi</div>
                  <div className="text-sm text-white/70 mt-1">India</div>
                </div>
              </div>

              {/* Check-In Date */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-white mb-1">Check-In</label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white text-left"
                  >
                    <div className="text-lg font-bold">Select Date</div>
                  </button>
                </div>
              </div>

              {/* Check-Out Date */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-white mb-1">Check-Out</label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white text-left"
                  >
                    <div className="text-lg font-bold">Select Date</div>
                  </button>
                </div>
              </div>

              {/* Guests */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-white mb-1">Guests</label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white text-left"
                  >
                    <div className="text-lg font-bold">Add Adults & Children</div>
                  </button>
                </div>
              </div>

              {/* Price Range */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-white mb-1">Price Per Night</label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full p-3 pl-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white text-left"
                  >
                    <div className="text-lg font-bold">₹0-₹1500, ₹1500-₹2500,...</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-12 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
              >
                SEARCH
              </button>
            </div>
          </form>
        )
      case 'holiday':
        return (
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex items-center space-x-6 mb-4 overflow-x-auto py-2 px-4 bg-black/30 backdrop-blur-sm rounded-t-lg shadow-lg">
              <button className="flex items-center p-2 text-white border-b-2 border-blue-500">
                <span className="text-lg mr-2">🔍</span>
                <span className="whitespace-nowrap font-medium">Search</span>
              </button>
              <button className="flex items-center p-2 text-white/80 hover:text-white">
                <span className="text-lg mr-2">🏷️</span>
                <span className="whitespace-nowrap font-medium">Salespecial</span>
              </button>
              <button className="flex items-center p-2 text-white/80 hover:text-white">
                <span className="text-lg mr-2">🌙</span>
                <span className="whitespace-nowrap font-medium">Honeymoon</span>
              </button>
              <button className="flex items-center p-2 text-white/80 hover:text-white">
                <span className="text-lg mr-2">✈️</span>
                <span className="whitespace-nowrap font-medium">Air India Express Holidays</span>
              </button>
            </div>
            
            <form className="bg-black/30 backdrop-blur-sm rounded-b-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* From City */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-white mb-1">From City</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
                      defaultValue="New Delhi"
                      readOnly
                    />
                    <div className="text-xl font-bold text-white mt-1">New Delhi</div>
                    <div className="text-sm text-white/70 mt-1">India</div>
                  </div>
                </div>

                {/* To City/Country/Category */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-white mb-1">To City/Country/Category</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
                      defaultValue="Goa"
                      readOnly
                    />
                    <div className="text-xl font-bold text-white mt-1">Goa</div>
                  </div>
                </div>

                {/* Departure Date */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-white mb-1">
                    Departure Date
                    <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full p-3 border border-white/20 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
                    >
                      <div className="text-lg font-bold">Select Date</div>
                    </button>
                  </div>
                </div>

                {/* Rooms & Guests */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-white mb-1">
                    Rooms & Guests
                    <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full p-3 border border-white/20 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
                    >
                      <div className="text-lg font-bold">Select Rooms</div>
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-white mb-1">
                    Filters
                    <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full p-3 border border-white/20 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/20 text-white"
                    >
                      <div className="text-lg font-bold">Select Filters (Optional)</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center mt-6 relative">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-20 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  SEARCH
                </button>
              </div>
            </form>
          </div>
        )
      case 'cabs':
        return <CabBookingForm />
      case 'buses':
        return <BusBookingForm />
      default:
        return <CabBookingForm />
    }
  }

  return (
    <main className="min-h-screen">
      {/* Fixed Background Image */}
      <div className="fixed inset-0">
          <Image
            src={bgImage}
            alt="Background"
            fill
          style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

      {/* Scrollable Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="min-h-screen">
          {/* Content */}
          <div className="relative z-10 pt-4">
            {/* Navbar */}
            <div className="absolute top-4 left-0 right-0 px-4">
              <Navbar onTabChange={handleTabChange} />
          </div>

            {/* Booking Form Container */}
            <div className="pt-40 px-4 max-w-6xl mx-auto">
              {renderBookingForm()}
        </div>
      </div>
        </section>

      {/* Top Visited Places Section */}
        <section className="relative py-16">
          <div className="relative z-10 container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">Top Visited Places</h2>
            <p className="text-white/80 text-center mb-10 max-w-3xl mx-auto">
              Discover the most popular destinations in Maharashtra, each offering unique experiences and unforgettable memories.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DestinationCard
              city="Pune City"
              tag="Pune"
              description="Cultural capital with perfect blend of tradition and modernity"
              rating={5}
              reviews={7064}
              imageSrc="/images/pune.jpg"
            />
            <DestinationCard
              city="Mumbai"
              tag="Mumbai"
              description="The city that never sleeps, financial capital of India"
              rating={4.5}
              reviews={12385}
              imageSrc="/images/mumbai.jpg"
            />
            <DestinationCard
              city="Kolhapur"
              tag="Kolhapur"
              description="Historic city known for temples and traditional cuisine"
              rating={5}
              reviews={4892}
              imageSrc="/images/kolhapur.jpg"
            />
            <DestinationCard
              city="Satara"
              tag="Satara"
              description="Scenic hill stations and majestic mountain ranges"
              rating={4}
              reviews={3456}
              imageSrc="/images/satara.jpg"
            />
            <DestinationCard
              city="Banglore"
              tag="Banglore"
              description="Green parks enhance Bangalore's urban charm"
              rating={4}
              reviews={2789}
              imageSrc="/images/banglore.jpg"
            />
            <DestinationCard
              city="Solapur"
              tag="Solapur"
              description="Famous for textiles and religious heritage"
              rating={4}
              reviews={3124}
              imageSrc="/images/solapur.jpg"
            />
          </div>
        </div>
      </section>

        {/* White background for remaining sections */}
        <div className="bg-white">
      {/* Cab Booking Section */}
          {currentTab === 'cabs' && (
            <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Book Your Cab Now!</h2>
          <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">
            Choose from our selection of comfortable and reliable vehicles
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CabCard type="Luxury" description="Premium comfort and style" imageSrc="/images/luxury-car.jpg" />
            <CabCard type="Hatchback" description="Compact and efficient" imageSrc="/images/hatchback-car.jpg" />
            <CabCard type="Sedan" description="Perfect balance of comfort" imageSrc="/images/sedan-car.jpg" />
          </div>
        </div>
      </section>
          )}

      {/* App Promotion Section */}
      <AppPromotion />

      {/* Footer */}
      <Footer />
        </div>
      </div>
    </main>
  )
}

