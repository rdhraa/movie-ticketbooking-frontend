import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/Darkmode";

export const AdminHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 shadow-lg bg-base-200">
      <Link to="/admin/dashboard">
        <img 
        src="/logo.png" 
        alt="logo" 
         className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain" 
     />
     </Link>

      <div className="flex items-center gap-4 sm:gap-6">
        <DarkMode />
        <span className="font-semibold hidden sm:inline">Admin Panel</span>
      </div>
    </header>
  );
};
