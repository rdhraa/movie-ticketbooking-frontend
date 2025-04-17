import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { toast } from "react-hot-toast";

export const ChangePasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      return toast.error("New passwords do not match");
    }

    try {
      await axiosInstance.put("/theater/change-password", {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }, { withCredentials: true });

      toast.success("Password changed successfully");
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">🔒 Change Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-purple-600 text-white rounded">Change</button>
          </div>
        </form>
      </div>
    </div>
  );
};
