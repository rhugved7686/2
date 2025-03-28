import Link from "next/link"
import { useState } from "react"

export default function Footer() {
  const [openSections, setOpenSections] = useState({
    popularCities: false,
    corporateCabs: false,
    airportCabs: false,
    states: false
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    })
  }

  return (
    <footer className="bg-gray-100">
      <div className="bg-black py-2">{/* Black bar at the top of the footer */}</div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Popular Cities Column */}
          <div>
            <h3 
              className="flex items-center justify-between text-lg font-semibold mb-4 cursor-pointer hover:text-teal-600 transition-colors"
              onClick={() => toggleSection('popularCities')}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                  <path d="M12 3v6" />
                </svg>
                Popular Cities
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transition-transform duration-300 ${openSections.popularCities ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </h3>
            <div className={`grid grid-cols-2 gap-2 transition-all duration-300 ${openSections.popularCities ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <Link href="/cities/Cab-Service-Pune" className="text-gray-600 hover:text-teal-500">
                Pune
              </Link>
              <Link href="/cities/Cab-Service-Mumbai" className="text-gray-600 hover:text-teal-500">
                Mumbai
              </Link>
              <Link href="/cities/Cab-Service-Kolhapur" className="text-gray-600 hover:text-teal-500">
                Kolhapur
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Nashik
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Nagpur
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Satara
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Sangli
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Solapur
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Baramati
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Lonavala
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Ahmednagar
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Latur
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Osmanabad
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Sindhudurg
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Wardha
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Washim
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Yavatmal
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Bhandara
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Chandrapur
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Gondia
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-500">
                Amravati
              </Link>
            </div>
          </div>

          {/* Corporate Cabs Column */}
          <div>
            <h3 
              className="flex items-center justify-between text-lg font-semibold mb-4 cursor-pointer hover:text-teal-600 transition-colors"
              onClick={() => toggleSection('corporateCabs')}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
                  <path d="M14 17H9" />
                  <path d="M5 18v2" />
                  <path d="M19 18v2" />
                  <path d="M15 4V3" />
                  <path d="M9 4V3" />
                  <path d="M12 4V3" />
                  <path d="M4 10h16" />
                  <path d="M9 17l-1 4" />
                  <path d="M15 17l1 4" />
                </svg>
                Corporate Cabs
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transition-transform duration-300 ${openSections.corporateCabs ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </h3>
            <div className={`space-y-2 transition-all duration-300 ${openSections.corporateCabs ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Corporate Cabs in Delhi
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Corporate Cabs in Pune
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Corporate Cabs in Bangalore
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Corporate Cabs in Hyderabad
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Corporate Cabs in Mumbai
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Corporate Cabs in Telangana
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Corporate Cabs in Chennai
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Corporate Cabs in Surat
              </Link>
            </div>
          </div>

          {/* Airport Cabs Column */}
          <div>
            <h3 
              className="flex items-center justify-between text-lg font-semibold mb-4 cursor-pointer hover:text-teal-600 transition-colors"
              onClick={() => toggleSection('airportCabs')}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Airport Cabs
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transition-transform duration-300 ${openSections.airportCabs ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </h3>
            <div className={`space-y-2 transition-all duration-300 ${openSections.airportCabs ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Airport Cabs in Delhi
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Airport Cabs in Pune
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Airport Cabs in Bangalore
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Airport Cabs in Mumbai
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Airport Cabs in Hyderabad
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Airport Cabs in Telangana
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Airport Cabs in Chennai
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Airport Cabs in Surat
              </Link>
            </div>
          </div>

          {/* States Column */}
          <div>
            <h3 
              className="flex items-center justify-between text-lg font-semibold mb-4 cursor-pointer hover:text-teal-600 transition-colors"
              onClick={() => toggleSection('states')}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="m2 6 10.5-3 10.5 3" />
                  <path d="M2 12h20" />
                  <path d="M2 18h20" />
                  <path d="M2 6v16h20V6" />
                </svg>
                States
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transition-transform duration-300 ${openSections.states ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </h3>
            <div className={`space-y-2 transition-all duration-300 ${openSections.states ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Maharashtra
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Goa
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Gujarat
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Karnataka
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                UP
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                West Bengal
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Kerala
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Rajasthan
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                HP
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Tamil Nadu
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Punjab
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Chhattisgarh
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-teal-500">
                Andhra Pradesh
              </Link>
            </div>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="#" className="text-gray-600 hover:text-teal-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-teal-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-teal-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-teal-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <div className="text-gray-600 text-sm">
            © Copyright WTL 2025. Made with <span className="text-red-500">❤</span> by xyztech.{" "}
            <Link href="/privacy-policy" className="hover:text-teal-500">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

