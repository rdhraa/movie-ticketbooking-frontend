import React, { useState, useEffect } from 'react';
import { Usefetch } from '../../hooks/Usefetch';
import { EditProfileModal } from '../../components/user/EditProfileModal';
import { axiosInstance } from '../../config/axiosinstance';
import { ChangePasswordModal } from '../../components/user/ChangePasswordModal';
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [userDetails, isLoading, error] = Usefetch('/user/profile');
  const [showOrders, setShowOrders] = useState(false);
  const [userTickets, setUserTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [ticketError, setTicketError] = useState(null);
  const [isCancelling, setIsCancelling] = useState(null); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.get('/user/logout');
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const fetchTickets = async () => {
    try {
      setLoadingTickets(true);
      const res = await axiosInstance.get('/tickets/my-tickets');
      setUserTickets(res.data.tickets || []);
      setTicketError(null);
    } catch (err) {
      console.error(err);
      setTicketError('Something went wrong.');
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    if (showOrders) fetchTickets();
  }, [showOrders]);

  const handleCancel = async (ticketId) => {
    setIsCancelling(ticketId);
    try {

      const res = await axiosInstance.patch(`/tickets/${ticketId}/cancel`);
      const data = res.data;

      if (res.ok) {
        alert('Ticket cancelled successfully.');
        fetchTickets();
      } else {
        alert(data.message || 'Failed to cancel ticket.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setIsCancelling(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-8">
        <img
          src={userDetails?.profilePic}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover mb-3"
        />
        <h1 className="text-xl font-semibold text-gray-800">{`Welcome, ${userDetails?.name}`}</h1>
        <p className="text-gray-600">Email: {userDetails?.email}</p>
        <p className="text-gray-600">Mobile: {userDetails?.mobile}</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => setShowEditModal(true)}
        >
          Edit Profile
        </button>

        {showEditModal && (
          <EditProfileModal
            user={userDetails}
            onClose={() => setShowEditModal(false)}
            onProfileUpdated={() => window.location.reload()}
          />
        )}

        <button
          className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => setShowOrders(!showOrders)}
        >
          My Orders
        </button>

        <button
          className="px-5 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
          onClick={() => setShowChangePassword(true)}
        >
          Change Password
        </button>

        {showChangePassword && (
          <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
        )}

        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {showOrders && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
          {loadingTickets ? (
            <p className="text-center text-gray-600">Loading your tickets...</p>
          ) : ticketError ? (
            <p className="text-center text-red-500">{ticketError}</p>
          ) : userTickets.length === 0 ? (
            <p className="text-center text-gray-500">You have no tickets yet.</p>
          ) : (
            <ul className="space-y-4">
              {userTickets.map((ticket) => (
                <li
                  key={ticket._id}
                  className="bg-gray-50 p-4 rounded-md border border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center"
                >
                  <div className="text-sm text-gray-700">
                    <p className="font-medium text-black mb-1">Ticket #{ticket.ticketNumber}</p>
                    <p>Seat: {ticket.seatNumber}</p>
                    <p>Status: {ticket.status}</p>
                    <p>Price: ₹{ticket.price}</p>
                    <p>Booking Time: {new Date(ticket.bookingTime).toLocaleString()}</p>
                  </div>
                  {ticket.status === 'booked' && (
                    <button
                      disabled={isCancelling === ticket._id}
                      className={`mt-4 md:mt-0 px-4 py-2 text-white rounded-md ${
                        isCancelling === ticket._id
                          ? 'bg-red-300'
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                      onClick={() => handleCancel(ticket._id)}
                    >
                      {isCancelling === ticket._id ? 'Cancelling...' : 'Cancel'}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
