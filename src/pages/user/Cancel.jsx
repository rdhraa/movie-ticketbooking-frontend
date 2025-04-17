import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem("bookingDetails");

    const timer = setTimeout(() => {
      navigate("/"); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-lg mb-4">
        Your payment was not completed. You haven't been charged.
      </p>
      <p className="text-gray-500">Redirecting you to homepage...</p>
    </div>
  );
};
