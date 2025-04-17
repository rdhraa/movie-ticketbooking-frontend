import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { EditAdminProfileModal } from "../../components/admin/EditAdminProfileModal";
import { ChangeAdminPasswordModal } from "../../components/admin/ChangeAdminPasswordModal";

const AdminProfilePage = () => {
  const [admin, setAdmin] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const res = await axiosInstance.get("/admin/profile", {
        withCredentials: true,
      });
      setAdmin(res.data.data);
    } catch (err) {
      console.error("Failed to fetch admin profile", err);
    }
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center sm:max-w-lg lg:max-w-2xl">
        {admin ? (
          <>
            <div className="flex justify-center mb-4">
              <img
                src={admin.profilePic}
                alt="Admin"
                className="h-24 w-24 rounded-full object-cover border"
              />
            </div>
            <h2 className="text-xl font-semibold text-blue-700">{admin.name}</h2>
            <p className="text-gray-600 mt-1">Email: {admin.email}</p>
            <p className="text-gray-600">Mobile: {admin.mobile}</p>

            <div className="flex justify-center mt-6 gap-4 flex-wrap">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Change Password
              </button>
            </div>
          </>
        ) : (
          <p>Loading admin profile...</p>
        )}
      </div>

      {/* Modals */}
      <EditAdminProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        admin={admin}
        refresh={fetchAdminProfile}
      />

      <ChangeAdminPasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default AdminProfilePage;
