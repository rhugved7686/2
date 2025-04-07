"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

function InvoiceContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Add state to keep track if we've loaded data from localStorage
  const [dataLoaded, setDataLoaded] = useState(false)
 
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
  
  const [formErrors, setFormErrors] = useState({
    phone: ""
  })
  
  const [pricing, setPricing] = useState({
    driverrate: 0,
    gst: 0,
    service: 0,
    total: 0,
    isCalculated: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingId, setBookingId] = useState("")

  useEffect(() => {
    // Try to get booking data from localStorage first
    const storedBookingData = localStorage.getItem('bookingData')
    
    if (storedBookingData && !dataLoaded) {
      // If we have stored data and haven't loaded it yet, use it
      try {
        const parsedData = JSON.parse(storedBookingData)
        setCarData(parsedData)
        setDataLoaded(true)
        
        // Clean the URL to hide parameters
        if (window.history && window.history.replaceState) {
          const cleanUrl = window.location.pathname
          window.history.replaceState({}, document.title, cleanUrl)
        }
        return
      } catch (e) {
        console.error('Error parsing stored booking data:', e)
      }
    }
    
    // Otherwise, fall back to URL parameters (existing code)
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

    const carData = {
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
    }
    
    setCarData(carData)
    
    // Store data in localStorage for future use
    localStorage.setItem('bookingData', JSON.stringify(carData))
    
    // Clean the URL to hide parameters
    if (window.history && window.history.replaceState && Object.values(carData).some(v => v !== "" && v !== 0 && v !== "0")) {
      const cleanUrl = window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
    }
    
  }, [searchParams])

  const calculatePricing = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return false;
    }
    
    setIsSubmitting(true);
    
    // Create form data for submission to get pricing
    const formDataToSubmit = new URLSearchParams({
      modelName: carData.name,
      modelType: carData.category,
      seats: '4+1',
      fuelType: 'CNG-Diesel',
      availability: 'Available',
      price: carData.price.toString(),
      pickupLocation: carData.pickupLocation,
      dropLocation: carData.dropLocation,
      date: carData.date,
      returndate: carData.returnDate || '',
      time: carData.time,
      tripType: carData.tripType,
      distance: carData.distance,
      days: carData.days
    });

    try {
      // Temporarily use the invoice1 endpoint which is already working
      const response = await fetch('https://api.worldtriplink.com/api/invoice1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSubmit
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('Pricing data from API:', data);
      
      // Update pricing state with values from API
      setPricing({
        driverrate: data.driverrate || 0,
        gst: data.gst || 0,
        service: data.service || 0,
        total: data.total || 0,
        isCalculated: true
      });
      
      setIsSubmitting(false);
      return true;
    } catch (error) {
      console.error('Error fetching pricing:', error);
      alert('Failed to get pricing information. Please try again.');
      setIsSubmitting(false);
      return false;
    }
  };

  const validatePhone = (value: string) => {
    if (!value) {
      return "Phone number is required";
    }
    if (!/^\d{10}$/.test(value)) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, '');
    // Update form data
    setFormData({ ...formData, phone: digitsOnly });
    // Validate immediately
    setFormErrors({
      ...formErrors,
      phone: validatePhone(digitsOnly)
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    const phoneError = validatePhone(formData.phone);
    setFormErrors({
      ...formErrors,
      phone: phoneError
    });
    
    if (!formData.name || !formData.email || phoneError) {
      alert("Please fill in all required fields correctly");
      return;
    }
    
    setIsSubmitting(true);
    
    // Create form data with all necessary parameters
    const formDataToSubmit = new URLSearchParams({
      cabId: carData.name,
      modelName: carData.name,
      modelType: carData.category,
      seats: '4+1',
      fuelType: 'CNG-Diesel',
      availability: 'Available',
      price: carData.price.toString(),
      pickupLocation: carData.pickupLocation,
      dropLocation: carData.dropLocation,
      date: carData.date,
      returndate: carData.tripType === 'roundTrip' || carData.tripType === 'round-trip' ? 
                  (carData.returnDate || carData.date) : '',
      time: carData.time,
      tripType: carData.tripType,
      distance: carData.distance,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: Math.round(carData.price * 0.10).toString(),
      gst: Math.round(carData.price * 0.05).toString(),
      total: (carData.price + Math.round(carData.price * 0.10) + Math.round(carData.price * 0.05)).toString(),
      days: carData.days,
      driverrate: "0"
    });
    
    // Debug logging
    console.log("Booking data being sent:", {
      tripType: carData.tripType,
      date: carData.date,
      returnDate: carData.returnDate,
      formattedReturnDate: carData.tripType === 'roundTrip' || carData.tripType === 'round-trip' ? 
                           (carData.returnDate || carData.date) : ''
    });

    try {
      // Use the websiteBooking endpoint 
      const response = await fetch('https://api.worldtriplink.com/api/websiteBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSubmit
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error('Server responded with an error');
      }
      
      const data = await response.json();
      console.log('Booking response:', data);
      
      if (data.status === 'success') {
        // Save booking ID
        setBookingId(data.bookingId);
        
        // Show success message with booking ID
        setBookingSuccess(true);
        
        // Show booking ID alert
        alert(`Booking successful! Your booking ID is: ${data.bookingId}\nPlease check your email for confirmation.`);
        
        // Redirect after successful booking
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        throw new Error(data.error || 'Booking failed');
      }
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to complete booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add cleanup in componentWillUnmount equivalent
  useEffect(() => {
    return () => {
      // Clean up localStorage when component unmounts after successful booking
      if (bookingSuccess) {
        localStorage.removeItem('bookingData')
      }
    }
  }, [bookingSuccess])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Success Message */}
        {bookingSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your booking has been confirmed! Your booking ID is: <strong>{bookingId}</strong>. An email has been sent with your booking details. Redirecting to home page...</span>
          </div>
        )}
      
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Booking Invoice
          </h1>
          <p className="mt-2 text-gray-600">Complete your booking details below</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column - Car Details */}
            <div className="p-6 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4 text-white">Cab Information</h2>
               
                <div className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-56 h-40 relative rounded-xl overflow-hidden shadow-2xl">
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

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-blue-200 text-xs">Model Type</p>
                      <p className="font-semibold">{carData.category}</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-blue-200 text-xs">Seats</p>
                      <p className="font-semibold">4+1</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-blue-200 text-xs">Fuel Type</p>
                      <p className="font-semibold">CNG-Diesel</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-blue-200 text-xs">Availability</p>
                      <p className="font-semibold">Available</p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-200">Price:</span>
                        <span className="font-semibold">₹{pricing.isCalculated ? carData.price : carData.price}</span>
                      </div>
                      
                      {pricing.isCalculated && pricing.driverrate > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-blue-200">Driver Allowance:</span>
                          <span className="font-semibold">₹{pricing.driverrate}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-blue-200">Service Charge:</span>
                        <span className="font-semibold">₹{pricing.isCalculated ? pricing.service : Math.round(carData.price * 0.10)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-blue-200">GST:</span>
                        <span className="font-semibold">₹{pricing.isCalculated ? pricing.gst : Math.round(carData.price * 0.05)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xl mt-3 pt-3 border-t border-white/20">
                        <span className="font-bold">Total Amount:</span>
                        <span className="font-bold text-2xl">
                          ₹{pricing.isCalculated 
                            ? pricing.total 
                            : (carData.price + Math.round(carData.price * 0.10) + Math.round(carData.price * 0.05))}
                        </span>
                      </div>
                      
                      {pricing.isCalculated && (
                        <div className="mt-2 text-center bg-white/20 p-1 rounded-lg">
                          <span className="text-white text-sm">
                            Pricing calculated by server
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Trip Details & Form */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Information</h2>
             
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Pickup Location</p>
                    <p className="font-medium text-gray-800">{carData.pickupLocation}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Drop Location</p>
                    <p className="font-medium text-gray-800">{carData.dropLocation}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium text-gray-800">{carData.date}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Return Date</p>
                    <p className="font-medium text-gray-800">{carData.returnDate}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-medium text-gray-800">{carData.time}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Trip Type</p>
                    <p className="font-medium text-gray-800">{carData.tripType}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                    <p className="text-xs text-gray-500">Distance</p>
                    <p className="font-medium text-gray-800">{carData.distance} km</p>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={pricing.isCalculated}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={pricing.isCalculated}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    className={`w-full px-3 py-2 border-2 ${formErrors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Enter your 10-digit phone number"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    pattern="[0-9]{10}"
                    maxLength={10}
                    disabled={pricing.isCalculated}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold text-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-4 text-center text-gray-600">
          <p className="text-xs">
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

export default function BookingInvoice() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvoiceContent />
    </Suspense>
  )
} 