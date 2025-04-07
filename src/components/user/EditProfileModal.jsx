import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().matches(/^[6-9]\d{9}$/, "Invalid mobile number").required("Mobile is required"),
});

export const EditProfileModal = ({ user, onClose, onProfileUpdated }) => {
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: user,
    resolver: yupResolver(schema),
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // set in Cloudinary settings

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setValue("profilePic", data.secure_url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const res = await fetch("/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated");
        onProfileUpdated(); // to refresh user data in parent
        onClose();
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <input type="file" hidden onChange={handleUpload} />
              <img
                src={user?.profilePic}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-300"
              />
              <p className="text-sm text-center text-blue-500 mt-1">{uploading ? "Uploading..." : "Change Photo"}</p>
            </label>
          </div>

          <div>
            <input {...register("name")} placeholder="Name" className="input" />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>
          <div>
            <input {...register("email")} placeholder="Email" className="input" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <input {...register("mobile")} placeholder="Mobile" className="input" />
            <p className="text-red-500 text-sm">{errors.mobile?.message}</p>
          </div>

          <div className="flex justify-between mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
