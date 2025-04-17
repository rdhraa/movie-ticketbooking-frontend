import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/Darkmode";
import { UserCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export const TheaterHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-base-100 shadow-md px-4 sm:px-6 lg:px-10 relative z-50">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="logo" className="h-16 w-auto" />
          <h1 className="text-xl font-bold">🎭 Theater Panel</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
          <Link to="/theater/dashboard" className="hover:text-primary">
            Dashboard
          </Link>

          <DarkMode />

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-primary text-purple-700 dark:text-purple-400"
            >
              <UserCircleIcon className="h-9 w-9" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-md z-50  ">
                <Link to="/theater/profile" className="block px-4 py-2 ">
                  👤 View Profile
                </Link>
                <Link to="/theater/add-film" className="block px-4 py-2">
                  ➕ Add Movie
                </Link>
                <Link to="/theater/my-films" className="block px-4 py-2 ">
                  🎞 My Films
                </Link>
                <Link to="/theater/my-bookings" className="block px-4 py-2 ">
                  🎟️ My Bookings
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col md:hidden gap-4 pb-4 border-t pt-4 text-sm font-medium  px-4">
          <Link to="/theater/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/theater/profile" onClick={() => setMenuOpen(false)}>👤 View Profile</Link>
          <Link to="/theater/add-film" onClick={() => setMenuOpen(false)}>➕ Add Movie</Link>
          <Link to="/theater/my-films" onClick={() => setMenuOpen(false)}>🎞 My Films</Link>
          <Link to="/theater/my-bookings" onClick={() => setMenuOpen(false)}>🎟️ My Bookings</Link>
          <div className="pt-2">
            <DarkMode />
          </div>
        </div>
      )}
    </header>
  );
};
