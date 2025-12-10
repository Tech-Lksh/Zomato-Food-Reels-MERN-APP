import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* <img
            src="https://via.placeholder.com/40"
            className="h-10 w-10"
            alt="Logo"
          /> */}
          <Link to="/" className="text-xl font-bold text-gray-500">Food-Feed</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/user/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login with User
          </Link>

          <Link
            to="/foodpartner/register"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Login with Food Partner
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link
            to="/user/register"
            className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Login with User
          </Link>

          <Link
            to="/foodpartner/register"
            className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Login with Food Partner
          </Link>
        </div>
      )}
    </nav>
  );
}
