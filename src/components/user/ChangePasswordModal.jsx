import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosinstance';

export const ChangePasswordModal = ({ onClose }) => {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      return setError('All fields are required.');
    }

    if (form.newPassword !== form.confirmPassword) {
      return setError("New passwords don't match.");
    }

    try {
      const res = await axiosInstance.put('/user/password-change', {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      setSuccess('Password updated successfully!');
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };
  return (
<div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50 z-50">
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-96 text-gray-800 dark:text-gray-100">
    <h2 className="text-xl font-semibold mb-4">Change Password</h2>
    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="password"
        name="oldPassword"
        placeholder="Old Password"
        className="w-full border border-gray-300 px-4 py-2 rounded"
        value={form.oldPassword}
        onChange={handleChange}
      />
      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        className="w-full border border-gray-300 px-4 py-2 rounded"
        value={form.newPassword}
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm New Password"
        className="w-full border border-gray-300 px-4 py-2 rounded"
        value={form.confirmPassword}
        onChange={handleChange}
      />
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          className="text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Change
        </button>
      </div>
    </form>
  </div>
</div>
 );
};
