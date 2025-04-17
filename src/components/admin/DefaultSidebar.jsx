import React, { useState } from "react";
import { Link } from "react-router-dom";

export const DefaultSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`w-full sm:w-64 bg-base-300 p-4 shadow-inner h-auto sm:h-screen ${
          isOpen ? "block" : "hidden sm:block"
        }`}
      >
        <ul className="menu space-y-3">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin/login">Admin Login</Link></li>
        </ul>
      </aside>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed top-4 left-4 p-2 bg-blue-600 text-white rounded-full shadow-lg z-50"
      >
        {isOpen ? "Close" : "Menu"}
      </button>
    </>
  );
};
