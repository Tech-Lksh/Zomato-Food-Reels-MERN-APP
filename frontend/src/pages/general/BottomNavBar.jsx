import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Bookmark } from 'lucide-react'


const BottomNavBar = () => {
  return (
    <>
      {/* FIXED BOTTOM NAV */}
      <div className="h-16 bg-black border-t border-gray-700 flex justify-around items-center fixed bottom-0 left-0 w-full z-50">
        <Link
          to="/"
          className="flex flex-col items-center text-white hover:text-red-400 transition"
        >
          <Home className="h-7 w-7" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/saved"
          className="flex flex-col items-center text-white hover:text-red-400 transition"
        >
          <Bookmark className="h-7 w-7" />
          <span className="text-xs mt-1">Saved</span>
        </Link>
      </div>
    </>
  )
}

export default BottomNavBar