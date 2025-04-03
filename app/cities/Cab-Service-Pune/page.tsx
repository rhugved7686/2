"use client"

import React, { JSX } from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Footer from "@/components/footer"
import Navbar from "@/app/components/Navbar"
import BookingForm from "@/app/components/BookingForm"
import CabBookingForm from "@/app/components/CabBookingForm"
import BusBookingForm from "@/app/components/BusBookingForm"
import HotelBookingForm from "@/app/components/HotelBookingForm"

interface TravellerSelections {
  adults: number;
  children: number;
  infants: number;
  travelClass: string;
}

// FAQ Item Component
function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-0 border-t border-gray-200">
          <p className="text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  )
}

// Main Page Component
export default function PuneCabServicePage() {
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState('cabs');
  const [travellerSelections, setTravellerSelections] = useState<TravellerSelections>({
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: 'Economy/Premium Economy'
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderBookingForm = () => {
    switch (activeTab) {
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
                              const applyButton = document.activeElement;
                              if (applyButton instanceof HTMLElement) {
                                applyButton.classList.add('bg-blue-700');
                                setTimeout(() => {
                                  applyButton.classList.remove('bg-blue-700');
                                  const dropdown = document.getElementById('travellersDropdown');
                                  if (dropdown) {
                                    dropdown.classList.add('hidden');
                                    const mainButton = dropdown.parentElement?.querySelector('button:first-of-type');
                                    if (mainButton) {
                                      mainButton.classList.remove('ring-2', 'ring-blue-500', 'bg-white/30');
                                    }
                                  }
                                }, 200);
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
        return <BookingForm />
    }
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 max-w-lg w-full">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                There was an error loading this page. Please try again later.
              </p>
            </div>
          </div>
        </div>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onTabChange={handleTabChange} />
        
        {/* Hero Section with Background */}
        <div className="relative h-[550px]">
          <div className="absolute inset-0">
            <Image
              src="/images/pune.jpg"
              alt="Pune City"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="relative z-10 h-full">
            <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Cab Service in Pune
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Book reliable, affordable cab services in Pune for local travel, airport transfers, and outstation journeys
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="bg-gray-50">
          {/* About Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                WTL Tourism Pvt. Ltd. - Best Cab Service in Pune
          </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                WTL Tourism Pvt. Ltd. (World Trip Link) is your trusted cab booking company in Pune, offering seamless transportation solutions for local and outstation travel. Whether you're looking for the best cab service in Pune, cheapest cab service in Pune, or a daily cab service in Pune, we have got you covered with our professional and affordable ride options.
              </p>
            </div>
          </section>
          
          {/* Service Cards */}
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-4">Best Cab Service</h3>
                <p className="text-white/90">
                  Top-rated cab services with professional drivers, well-maintained vehicles, and on-time pickups. 10+ years of experience serving thousands of satisfied customers.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-4">Cheapest Cab Service</h3>
                <p className="text-white/90">
                  Affordable travel solutions with transparent pricing and no hidden charges. Choose from economy sedans to premium cars that suit your budget.
                </p>
            </div>
            
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-4">Daily Cab Service</h3>
                <p className="text-white/90">
                  Reliable daily commute solutions for professionals and students. Flexible booking options with timely service guaranteed.
                </p>
              </div>
            </div>
          </section>

          {/* Service Types Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white rounded-xl shadow-lg p-8 transform hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Local Cab Service in Pune</h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Point-to-point travel within Pune
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Hourly rental packages
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                    Airport & railway station transfers
                  </li>
                </ul>
                </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 transform hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Daily Cab Service in Pune</h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Office commute solutions
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Student transportation
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Monthly rental packages
                  </li>
                </ul>
            </div>
          </div>
        </section>
        
        {/* Outstation Routes */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Popular Outstation Routes from Pune
          </h2>
          
          <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-xl rounded-xl overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left">Destination</th>
                    <th className="py-4 px-6 text-left">Distance</th>
                    <th className="py-4 px-6 text-left">Sedan Rate</th>
                    <th className="py-4 px-6 text-left">SUV Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Pune to Mahabaleshwar</td>
                    <td className="py-4 px-6">250 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Pune to Satara</td>
                    <td className="py-4 px-6">226 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Pune to Mumbai</td>
                    <td className="py-4 px-6">296 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Pune to Shirdi</td>
                    <td className="py-4 px-6">400 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Pune to Aurangabad</td>
                    <td className="py-4 px-6">470 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                </tr>
              </tbody>
            </table>
          </div>
          </section>
          
          {/* About Section with Stats */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About WTL Tourism Pvt. Ltd.
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
                Established in 2016 in Pune, World Trip Link (WTL Tourism Pvt. Ltd.) has grown into a leading cab service provider, offering a wide range of transportation solutions across India.
              </p>
                  </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-600">Personal Cabs</div>
                  </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-emerald-600 mb-2">1500+</div>
                <div className="text-gray-600">Registered Fleet</div>
                </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-gray-600">Cities Covered</div>
                  </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-yellow-600 mb-2">50+</div>
                <div className="text-gray-600">Corporate Solutions</div>
                  </div>
                </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Services</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Outstation cab services
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Employee transportation services
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Daily pick-up & drop
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                      Hotel and flight booking assistance
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Professional and experienced drivers
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Well-maintained vehicle fleet
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      24/7 customer support
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                      Transparent pricing
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem 
                question="Who is the best cab service provider in Pune?" 
                answer="WTL Tourism Pvt. Ltd. is a top-rated cab service provider in Pune, known for reliable transportation, affordable pricing, and excellent customer service. We cater to daily commuters, corporate clients, and travelers." 
              />
              <FaqItem 
                question="Which cab service is best in Pune?" 
                answer="WTL Tourism Pvt. Ltd. is widely recognized as the best cab service in Pune, thanks to our well-maintained fleet, affordable pricing, professional drivers, and 24/7 availability for both local and outstation travel." 
              />
              <FaqItem 
                question="What are the best corporate cab services in Pune?" 
                answer="WTL Tourism Pvt. Ltd. offers corporate cab services in Pune with professional chauffeurs, on-time pickups, and customized corporate travel solutions. We provide employee transportation, corporate event travel, and long-term rental plans for businesses." 
            />
            <FaqItem 
                question="Is there a reliable cab service in Hadapsar, Pune?" 
                answer="Yes, WTL Tourism Pvt. Ltd. provides cab service in Hadapsar Pune, offering affordable and comfortable rides for local and outstation travel. Whether you need a daily commute or a weekend trip, we have the best options available." 
            />
            <FaqItem 
                question="Do you offer cab service in Hinjewadi, Pune?" 
                answer="Yes, our cab service in Hinjewadi Pune is ideal for IT professionals, corporate employees, and residents. We provide daily office commute cabs, outstation trips, and late-night rides from Hinjewadi and surrounding areas." 
            />
            <FaqItem 
                question="Can I book a cab service in Pune for the airport?" 
                answer="Absolutely! WTL Tourism Pvt. Ltd. offers cab service in Pune for the airport, ensuring timely pickups and drop-offs at Pune International Airport. Our airport cabs are available 24/7 with fixed and transparent pricing." 
            />
            <FaqItem 
                question="Do you provide night cab service in Pune?" 
                answer="Yes, our night cab service in Pune ensures safe and comfortable rides during late hours. Whether you need a cab for a night out, an emergency trip, or an early morning airport transfer, our cabs are available 24/7." 
            />
          </div>
        </section>
        
          {/* Contact Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.656 0L26.172 6.485 24 8.657 34.657 0h-2zM38.315 0L29.828 8.485 27.657 10.657 38.315 0zm5.657 0l-5.657 5.657L36.485 7.828 42.142 0h2.83zM53.657 0l3.657 3.657L43.828 17.143l-1.414-1.414L53.657 0zM17.143 42.414l3.657 3.657-.828.828-3.657-3.657.828-.828zM0 22.344l3.657 3.657L0 29.657V22.344zM54.627 60l.83-.828-1.415-1.415L51.8 60h2.827zM5.373 60l-.83-.828L5.96 57.757 8.2 60H5.374zM48.97 60l3.657-3.657-1.414-1.414L46.143 60h2.828zM11.03 60L7.372 56.343 8.787 54.93 13.857 60H11.03zm32.284 0L49.8 53.515l-1.415-1.414-7.9 7.9h2.83zM16.686 60L10.2 53.515l1.415-1.414 7.9 7.9h-2.83zm5.657 0L13.857 51.515l1.415-1.414 7.9 7.9h-.828zM28 60l-8.485-8.485L17.343 49.343 28 60zm4.657 0l-6.485-6.485L24 51.343 34.657 60h-2zm5.657 0l-8.485-8.485L27.657 49.343 38.315 60zm5.657 0l-5.657-5.657 1.414-1.415 5.657 5.657h-1.414zM53.657 60l3.657-3.657L43.828 42.857l-1.414 1.414L53.657 60zM17.143 17.586l3.657-3.657-.828-.828-3.657 3.657.828.828zM0 37.656l3.657-3.657L0 30.343v7.313z\' fill=\'%23FFFFFF\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                backgroundSize: '24px 24px'
              }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                  Book Your Cab with WTL Tourism Pvt. Ltd. Today!
            </h2>
                <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                  Experience the best cab service in Pune with our professional and reliable transportation solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 border border-white/20">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Call/WhatsApp</h3>
                      <div className="space-y-2">
                        <a href="tel:9112085055" className="block text-xl font-bold text-white hover:text-blue-200 transition-colors">
                          +91 91120 85055
                        </a>
                        <a href="tel:9130030054" className="block text-xl font-bold text-white hover:text-blue-200 transition-colors">
                          +91 91300 30054
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 border border-white/20">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Visit Our Website</h3>
                      <a 
                        href="https://www.worldtriplink.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xl font-bold text-white hover:text-blue-200 transition-colors"
                      >
                        www.worldtriplink.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link href="/">
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Book Your Ride Now
              </button>
                </Link>
            </div>
          </div>
        </section>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error rendering Pune Cab Service page:", error);
    setHasError(true);
    return null;
  }
} 