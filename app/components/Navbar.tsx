"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import CabBookingForm from './CabBookingForm'
import BusBookingForm from './BusBookingForm'
import HotelBookingForm from './HotelBookingForm'
import BookingForm from './BookingForm'

interface NavbarProps {
  onTabChange?: (tab: string) => void;
}

export default function Navbar({ onTabChange }: NavbarProps) {
  const [activeTab, setActiveTab] = useState('cabs')
  const [showForm, setShowForm] = useState(true)
  const pathname = usePathname()

  // Check if we're on a page that already has a booking form
  useEffect(() => {
    const pagesWithForms = ['/cities/Cab-Service-Pune', '/', '/cities/Cab-Service-Mumbai', '/cities/Cab-Service-Kolhapur']
    setShowForm(!pagesWithForms.includes(pathname))
  }, [pathname])

  const navItems = [
    { id: 'cabs', label: 'Cabs', icon: '🚕', component: CabBookingForm },
    { id: 'buses', label: 'Buses', icon: '🚌', component: BusBookingForm },
    { id: 'flights', label: 'Flights', icon: '✈️', component: BookingForm },
    { id: 'hotels', label: 'Hotels', icon: '🏨', component: HotelBookingForm },
    { id: 'homestays', label: 'Homestays & Villas', icon: '🏠', component: BookingForm },
    { id: 'holiday', label: 'Holiday Packages', icon: '🌴', component: BookingForm }
  ]

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  const renderActiveComponent = () => {
    if (!showForm) return null
    
    const activeItem = navItems.find(item => item.id === activeTab)
    if (activeItem && activeItem.component) {
      const Component = activeItem.component
      return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-4">
          <Component />
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto whitespace-nowrap py-2">
            <Link 
              href="/"
              className="flex items-center justify-center min-w-[40px] h-[40px] bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mr-4"
              title="Home"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`flex flex-col items-center px-4 py-2 space-y-1 min-w-[80px] transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {renderActiveComponent()}
    </div>
  )
}
 