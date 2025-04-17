import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/theater/Button";
import { ChangePasswordModal } from "../../components/theater/ChangePasswordModal";
import { toast } from "react-hot-toast";

import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import { EditTheaterModal } from "./EditTheaterProfileModal";

export const TheaterProfile = () => {
  const [theater, setTheater] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/theater/profile", {
        withCredentials: true,
      });
      setTheater(res.data.data);
    } catch (err) {
      console.error("Failed to fetch theater profile", err);
      toast.error("Unable to load profile.");
    }
  };

 
const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await axiosInstance.post("/theater/logout", {}, { withCredentials: true });
    toast.success("Logged out successfully");
    navigate("/theater/login");
  } catch (err) {
    toast.error("Logout failed");
  }
};


  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🏢 Theater Profile</h1>

      {theater ? (
        <div className=" p-6 rounded shadow flex flex-col md:flex-row gap-6 items-center md:items-start text-gray-700">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={theater.profilePic || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-purple-500"
            />
          </div>

          {/* Info Section */}
          <div className="space-y-3 w-full">
            <div className="flex items-center gap-2">
              <UserCircleIcon className="h-5 w-5 text-purple-600" />
              <p className="text-lg font-medium">{theater.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5 text-purple-600" />
              <p>{theater.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-purple-600" />
              <p>{theater.mobile || "N/A"}</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-purple-600" />
              <p>{theater.location || "N/A"}</p>
            </div>
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="h-5 w-5 text-purple-600" />
              <p>{theater.city || "N/A"}, {theater.country || "N/A"}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-4 hover:text-white">
            <Button onClick={() => setShowEditModal(true)}>Edit Profile</Button>

            {showEditModal && (
             <EditTheaterModal
                theater={theater}
                onClose={() => setShowEditModal(false)}
               onUpdate={(updated) => setTheater(updated)}
            />
           )}

          <Button onClick={() => setShowChangePasswordModal(true)}>Change Password</Button>

          {showChangePasswordModal && (
          <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} />
           )}
           <Button
               className="bg-red-500 hover:bg-red-600 text-white"
               onClick={handleLogout}
            >
           Logout
           </Button>

            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};
