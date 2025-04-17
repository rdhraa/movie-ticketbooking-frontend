import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { toast } from "react-hot-toast";

export const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("/theater/my-bookings", {
        withCredentials: true,
      });
      setBookings(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      toast.error("Error loading bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🎟️ My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="p-4 border rounded bg-white shadow">
              <div className="mb-2">
                <p className="font-semibold">🎬 {booking.filmTitle}</p>
                <p className="text-sm text-gray-500">🕒 {new Date(booking.showtime).toLocaleString()}</p>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>User:</strong> {booking.userName}</p>
                <p><strong>🎫 Seats:</strong> {booking.numberOfSeats}</p>
                <p><strong>💰 Total:</strong> ₹{booking.totalPrice}</p>
                <p><strong>Tickets:</strong></p>
                <ul className="list-disc ml-6">
                  {booking.tickets.map((ticket) => (
                    <li key={ticket._id}>{ticket.seatNumber} — {ticket.paymentStatus}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
