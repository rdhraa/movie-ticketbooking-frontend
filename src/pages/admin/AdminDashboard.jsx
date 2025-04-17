import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTheaters: 0,
    totalMovies: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/admin/dashboard-stats");
        setStats(response.data.data);
      } catch (error) {
        console.error("Failed to load admin stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Theaters" value={stats.totalTheaters} />
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Total Movies" value={stats.totalMovies} />
        <StatCard label="Total Bookings" value={stats.totalBookings} />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 text-center text-black transition-all duration-300 hover:shadow-lg">
    <h2 className="text-sm sm:text-base md:text-lg font-medium">{label}</h2>
    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-700 mt-1">{value}</p>
  </div>
);
