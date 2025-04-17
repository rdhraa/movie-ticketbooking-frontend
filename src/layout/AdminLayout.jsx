import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosinstance";
import { setAdmin, clearAdmin } from "../redux/features/adminSlice";
import { AdminHeader } from "../components/admin/AdminHeader";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { DefaultSidebar } from "../components/admin/DefaultSidebar";
import { Footer } from "../components/user/Footer";
import React, { useEffect, useState } from "react";

export const AdminLayout = () => {
  const isAdminAuth = useSelector((state) => state.admin.isAdminAuth);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const checkAdmin = async () => {
    try {
      const response = await axiosInstance.get("/admin/check-admin");
      dispatch(setAdmin(response.data.data));
    } catch (error) {
      dispatch(clearAdmin());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  if (isLoading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header */}
      <header className="w-full shadow-md sticky top-0 z-50 bg-base-100">
        <AdminHeader />
      </header>

      {/* Toggle Button for Sidebar */}
      

      {/* Sidebar + Main */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        {isAdminAuth ? (
          <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        ) : (
          <DefaultSidebar />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto mt-2">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-100 border-t mt-auto">
        <Footer />
      </footer>
    </div>
  );
};
