import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAdmin } from "../../redux/features/adminSlice";
import { axiosInstance } from "../../config/axiosinstance";
import { Menu, X } from "lucide-react";

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/admin/logout");
      dispatch(clearAdmin());
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 m-2 fixed top-16 left-4 z-50 bg-base-200 rounded shadow"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar Overlay on Small Screens */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 bg-base-300 p-4 shadow-md transition-transform transform md:relative md:translate-x-0 ${
        isOpen ? "translate-x-0 h-screen" : "-translate-x-full h-screen"
        } md:h-auto md:min-h-full`}
      >
        <ul className="menu space-y-3 mt-20 md:mt-0">
          <li><Link to="/admin/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
          <li><Link to="/admin/theaters" onClick={toggleSidebar}>Manage Theaters</Link></li>
          <li><Link to="/admin/users" onClick={toggleSidebar}>Users</Link></li>
          <li><Link to="/admin/movies" onClick={toggleSidebar}>Movies</Link></li>
          <li><Link to="/admin/profile" onClick={toggleSidebar}>Profile</Link></li>
          <li>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-left w-full text-red-600 hover:underline"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};
