import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosinstance";

export const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Creating your booking...");

  useEffect(() => {
    const createBooking = async () => {
      let bookingData;

      try {
        bookingData = JSON.parse(localStorage.getItem("bookingDetails"));
      } catch (e) {
        console.error("Error parsing booking details from localStorage.");
        setMessage("Corrupted booking data. Please try again.");
        setLoading(false);
        return;
      }

      if (!sessionId || !bookingData) {
        setMessage("Invalid or missing session or booking information.");
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.post("/bookings/create-after-payment", {
          sessionId,
          screeningId: bookingData.screeningId,
          numSeats: bookingData.numSeats,
          seatNumbers: bookingData.seatNumbers,
        });

        setMessage("Booking successful! 🎉 Redirecting to your profile...");
        localStorage.removeItem("bookingDetails");

        setTimeout(() => navigate("/user/profile"), 5000);
      } catch (error) {
        console.error("Booking creation error:", error);
        setMessage("Something went wrong while creating your booking.");
      } finally {
        setLoading(false);
      }
    };

    createBooking();
  }, [sessionId, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 text-center">
      <h1 className={`text-3xl font-bold mb-4 ${loading ? "text-blue-600" : "text-green-600"}`}>
        {loading ? "Processing your payment..." : "Success"}
      </h1>
      <p className="text-lg text-gray-700 mb-4">{message}</p>

      {loading && (
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      )}
    </div>
  );
};
