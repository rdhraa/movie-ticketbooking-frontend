import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosinstance";

export const TheaterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [theater, setTheater] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTheater = async () => {
    try {
      const res = await axiosInstance.get(`/admin/theaters/${id}`);
      setTheater(res.data.data);
    } catch (err) {
      console.error("Failed to fetch theater details", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async () => {
    try {
      await axiosInstance.put(`/admin/theaters/deactivate/${id}`);
      fetchTheater(); // Refresh after update
    } catch (err) {
      console.error("Failed to deactivate theater", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this theater?")) return;

    try {
      await axiosInstance.delete(`/admin/theaters/${id}`);
      navigate("/admin/theaters"); // Go back to list after delete
    } catch (err) {
      console.error("Failed to delete theater", err);
    }
  };

  useEffect(() => {
    fetchTheater();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!theater) return <div className="p-6">Theater not found</div>;

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Theater Details</h2>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Name:</strong> {theater.name}</p>
        <p><strong>Email:</strong> {theater.email}</p>
        <p><strong>Phone:</strong> {theater.mobile || "N/A"}</p>
        <p><strong>Location:</strong> {theater.location}, {theater.city}, {theater.country}</p>
        <p><strong>Status:</strong> <span className={theater.status === "approved" ? "text-green-600" : "text-red-600"}>{theater.status}</span></p>
        <p><strong>Active:</strong> {theater.isActive ? "Yes" : "No"}</p>
        <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Screens</h3>
        {theater.screens.length === 0 ? (
          <p>No screens available</p>
        ) : (
          theater.screens.map((screen, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <p><strong>Name:</strong> {screen.name}</p>
              <p><strong>Capacity:</strong> {screen.capacity}</p>
              <p><strong>Facilities:</strong> {screen.facilities.join(", ") || "None"}</p>
            </div>
          ))
        )}
      </div>

        <div className="mt-4 flex gap-2">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={handleDeactivate}
          >
            {theater.isActive ? "Deactivate" : "Already Inactive"}
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


