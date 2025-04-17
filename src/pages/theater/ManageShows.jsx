import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { Button } from "../../components/theater/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { EditScreeningModal } from "../../components/theater/EditScreeningModal";


export const ManageShows = () => {
  const [screenings, setScreenings] = useState([]);
  const [editingScreening, setEditingScreening] = useState(null);
  const navigate = useNavigate();

  const fetchScreenings = async () => {
    try {
      const res = await axiosInstance.get("/screening/my-screenings", {
        withCredentials: true,
      });
      setScreenings(res.data.data || []);
    } catch (err) {
      console.error("Error fetching screenings", err);
      toast.error("Failed to load screenings");
    }
  };

  useEffect(() => {
    fetchScreenings();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this screening?")) return;
    try {
      await axiosInstance.delete(`/screening/${id}`, {
        withCredentials: true,
      });
      toast.success("Screening deleted");
      fetchScreenings();
    } catch (err) {
      console.error("Failed to delete screening", err);
      toast.error("Failed to delete screening");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎬 Manage Screenings</h1>
        <Button onClick={() => navigate("/theater/add-screening")} className="bg-purple-400 hover:bg-purple-700 text-white">
          ➕ Add Screening
        </Button>
      </div>

      {screenings.length === 0 ? (
        <p className="text-gray-600">No screenings available.</p>
      ) : (
        <div className="space-y-4">
          {screenings.map((screening) => (
            <div key={screening._id} className="p-4 border rounded shadow bg-white hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">{screening.filmId?.title || "Untitled Film"}</h2>
                  <p className="text-sm text-gray-600">🎭 Screen: {screening.screenName}</p>
                  <p className="text-sm text-gray-600">🕒 {new Date(screening.showtime).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">💵 ₹{screening.price}</p>
                  <p className="text-sm text-gray-500">🎫 Seats: {screening.availableSeats} available</p>
                </div>
                <div className="space-x-2">
                  
                <Button onClick={() => setEditingScreening(screening)} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  Edit
                </Button>

                  <Button onClick={() => handleDelete(screening._id)} className="bg-red-500 hover:bg-red-600 text-white">
                    Delete
                  </Button>
                  {editingScreening && (
                    <EditScreeningModal
                   screening={editingScreening}
                  onClose={() => setEditingScreening(null)}
                  onSave={fetchScreenings}
                />
               )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
