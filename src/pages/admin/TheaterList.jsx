import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { useNavigate } from "react-router-dom";

export const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const navigate = useNavigate();

  const fetchTheaters = async () => {
    try {
      const res = await axiosInstance.get("/admin/theaters");
      setTheaters(res.data.data);
    } catch (err) {
      console.error("Error fetching theaters", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axiosInstance.patch(`/admin/theaters/${id}/status`, { status });
      fetchTheaters(); 
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Theater List</h2>
      <div className="grid gap-4">
        {theaters.map((theater) => (
          <div key={theater._id} className="bg-white p-4 rounded shadow text-black">
            <h3 className="text-xl font-semibold">{theater.name}</h3>
            <p>Email: {theater.email}</p>
            <p>Location: {theater.location}, {theater.city}, {theater.country}</p>
            <p>Status: <span className={`font-medium ${theater.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>{theater.status}</span></p>
            <div className="mt-2 flex gap-2">
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={() => handleStatusChange(theater._id, "approved")}
              >
                Approve
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => handleStatusChange(theater._id, "rejected")}
              >
                Reject
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={() => navigate(`/admin/theaters/${theater._id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
