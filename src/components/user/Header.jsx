import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/Darkmode";

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center px-4 py-3 md:px-8 md:py-6 lg:px-14 lg:py-8 h-20 shadow-2xl relative">
      <div>
        <img
          src="/logo.png"
          alt="logo"
          className="w-12 h-12 md:w-20 md:h-20 lg:w-32 lg:h-32"
        />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex justify-center items-center gap-8">
        <nav>
          <ul className="flex gap-6 text-sm lg:text-md">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/about"}>
              <li>About</li>
            </Link>
            <Link to={"/contact"}>
              <li>Contact</li>
            </Link>
            <Link to={"/films"}>
              <li>Films</li>
            </Link>
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <DarkMode />
          <button className="btn btn-primary" onClick={() => navigate("/signup")}>
            Join Us
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-20 right-4 w-3/4 bg-white text-black shadow-lg rounded-md p-4 flex flex-col gap-4 z-50 md:hidden">
  <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
    <div>Home</div>
  </Link>
  <Link to={"/about"} onClick={() => setIsMenuOpen(false)}>
    <div>About</div>
  </Link>
  <Link to={"/contact"} onClick={() => setIsMenuOpen(false)}>
    <div>Contact</div>
  </Link>
  <Link to={"/films"} onClick={() => setIsMenuOpen(false)}>
    <div>Films</div>
  </Link>
  <div className="flex flex-col items-center gap-4 mt-2">
    <DarkMode />
    <button className="btn btn-primary w-full" onClick={() => navigate("/signup")}>
      Join Us
    </button>
  </div>
</div>
      )}
    </div>
  );
};
