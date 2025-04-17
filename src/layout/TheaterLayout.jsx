import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TheaterHeader } from "../components/theater/TheaterHeader";
import { TheaterPublicHeader } from "../components/theater/TheaterPublicHeader";
import { Footer } from "../components/user/Footer";
import { axiosInstance } from "../config/axiosinstance";
import { saveTheater, clearTheater } from "../redux/features/theaterSlice";

export const TheaterLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const { isTheaterAuth } = useSelector((state) => state.theater);

  const checkTheater = async () => {
    try {
      const res = await axiosInstance.get("/theater/check-theater");
      dispatch(saveTheater(res.data.data));
    } catch (err) {
      dispatch(clearTheater());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkTheater();
  }, [location.pathname, isTheaterAuth]);

  if (isLoading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Responsive Header */}
      <header className="w-full shadow-md sticky top-0 z-50 ">
        {isTheaterAuth ? (
          <TheaterHeader />
        ) : (
          <TheaterPublicHeader />
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full  border-t py-4 sm:py-6">
        <Footer />
      </footer>
    </div>
  );
};
