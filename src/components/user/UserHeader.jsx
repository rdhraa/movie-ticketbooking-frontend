import React, { useState } from "react";
import { CircleUser, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/Darkmode";

export const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-base-100 shadow-md px-4 sm:px-6 lg:px-10">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <Link to={"/"}>
          <img
            src="/logo.png"
            alt="logo"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10 items-center font-semibold text-base">
          <Link to={"/"} className="hover:text-primary">Home</Link>
          <Link to={"/about"} className="hover:text-primary">About</Link>
          <Link to={"/contact"} className="hover:text-primary">Contact</Link>
          <Link to={"/films"} className="hover:text-primary">Films</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <DarkMode />
          <Link to={"/user/profile"} className="hidden sm:block">
            <CircleUser size={26} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden mt-2 gap-3 pb-4 border-t pt-4 text-sm font-medium">
          <Link to={"/"} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to={"/about"} onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to={"/contact"} onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to={"/films"} onClick={() => setIsMenuOpen(false)}>Films</Link>
          <Link to={"/user/profile"} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-1">
            <CircleUser size={20} /> Profile
          </Link>
        </div>
      )}
    </header>
  );
};
