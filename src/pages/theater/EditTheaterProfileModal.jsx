


import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { toast } from "react-hot-toast";

export const EditTheaterModal = ({ theater, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: theater.name || "",
    email: theater.email || "",
    mobile: theater.mobile || "",
    location: theater.location || "",
    city: theater.city || "",
    country: theater.country || "",
  });

  const [profilePic, setProfilePic] = useState(null); 
  const [preview, setPreview] = useState(theater.profilePic || ""); 
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (profilePic) {
      data.append("profilePic", profilePic);
    }

    try {
      const res = await axiosInstance.put("/theater/update", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Profile updated successfully");
      onUpdate(res.data.data);
      onClose();
    } catch (err) {
      console.error("Failed to update theater profile", err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg text-black">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        {["name", "email", "mobile", "location", "city", "country"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full mb-3 p-2 border rounded"
          />
        ))}

        <div className="mb-3">
          <label className="block mb-1">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
          {preview && (
            <img src={preview} alt="Preview" className="mt-2 h-20 w-20 rounded-full object-cover" />
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Save</button>
        </div>
      </div>
    </div>
  );
};
