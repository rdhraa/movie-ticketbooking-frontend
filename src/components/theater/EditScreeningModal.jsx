import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { toast } from "react-hot-toast";
import { Button } from "./Button";

export const EditScreeningModal = ({ screening, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    screenName: screening.screenName,
    showtime: screening.showtime,
    price: screening.price,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDateForInput = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 16); 
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/screening/${screening._id}`, formData, {
        withCredentials: true,
      });
      toast.success("Screening updated successfully");
      onSave(); 
      onClose(); 
    } catch (err) {
      console.error("Error updating screening", err);
      toast.error("Failed to update screening");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50  bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-purple-300 p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl text-black font-semibold mb-4">Edit Screening</h2>

        <label className="block mb-2 ">Screen Name</label>
        <input
          type="text"
          name="screenName"
          value={formData.screenName}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2" >Showtime</label>
        <input
          type="datetime-local"
          name="showtime"
          // value= {new Date(formData.showtime).toISOString().slice(0, 16)}
          value={formData.showtime}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 "
        />

        <label className="block mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 "
        />

        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} className="bg-gray-400 hover:bg-gray-500">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">Update</Button>
        </div>
      </div>
    </div>
  );
};
