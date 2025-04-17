import React, { useState, useEffect } from 'react';
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
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = form;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return setError('All fields are required.');
    }

    if (newPassword !== confirmPassword) {
      return setError("New passwords don't match.");
    }

    if (newPassword.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    try {
      const res = await axiosInstance.put('/user/password-change', {
        oldPassword,
        newPassword,
      });

      setSuccess('Password updated successfully!');
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-11/12 sm:w-96 max-w-lg text-gray-800 dark:text-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Change Password</h2>

        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.oldPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.newPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <div className="flex justify-between sm:justify-end gap-2 pt-2">
            <button
              type="button"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
