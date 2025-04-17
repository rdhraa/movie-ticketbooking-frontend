import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/Darkmode";
import { Menu, X } from "lucide-react";

export const TheaterPublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-base-100 shadow-md px-4 sm:px-6 lg:px-10 z-50 relative">
      <div className="flex justify-between items-center h-20">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="logo"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
            🎭 Theater Portal
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center font-semibold text-base ">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/theater/login" className="hover:text-primary">Login</Link>
          <Link to="/theater/signup" className="hover:text-primary">Register</Link>
          <DarkMode />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden mt-2 gap-4 pb-4 border-t pt-4 text-sm font-medium bg-base-100 z-40 absolute top-full left-0 w-full px-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/theater/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
          <Link to="/theater/signup" onClick={() => setIsMenuOpen(false)}>Register</Link>
          <div className="pt-2">
            <DarkMode />
          </div>
        </div>
      )}
    </header>
  );
};
