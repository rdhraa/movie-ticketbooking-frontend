import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { axiosInstance } from '../../config/axiosinstance';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .required("Mobile is required"),
});

export const EditProfileModal = ({ user, onClose, onProfileUpdated }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(user?.profilePic);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: user,
    resolver: yupResolver(schema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (formData) => {
    try {
      setUploading(true);
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("mobile", formData.mobile);
      if (selectedFile) {
        form.append("profilePic", selectedFile);
      }
  
      const res = await axiosInstance.put("/user/update", form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
  
      if (res.status === 200) {
        alert("Profile updated");
        onProfileUpdated();
        onClose();
      } else {
        alert(res.data.message || "Update failed");
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 sm:px-0">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md sm:max-w-sm md:max-w-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-black mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Profile Pic Upload */}
          <div className="flex justify-center">
            <label className="cursor-pointer flex flex-col items-center">
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              <img
                src={preview}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
              <p className="text-sm text-blue-500 mt-2">
                {uploading ? "Saving..." : "Change Photo"}
              </p>
            </label>
          </div>

          {/* Name */}
          <div>
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 bg-white dark:bg-gray-700 dark:text-white"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Mobile */}
          <div>
            <input
              {...register("mobile")}
              placeholder="Mobile"
              className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 bg-white dark:bg-gray-700 dark:text-white"
            />
            <p className="text-red-500 text-sm">{errors.mobile?.message}</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              disabled={uploading}
              className="w-full mr-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {uploading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full ml-2 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
