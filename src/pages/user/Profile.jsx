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
      // Optionally clear local storage if storing user info
      localStorage.removeItem("user");
      // Redirect to login page or home
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  //fetch tickets
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

  

  // Load tickets when showOrders is toggled ON
  useEffect(() => {
    if (showOrders) {
      fetchTickets();
    }
  }, [showOrders]);

  // Cancel a ticket
  const handleCancel = async (ticketId) => {
    setIsCancelling(ticketId);
    try {
      const res = await fetch(`/tickets/${ticketId}/cancel`, {
        method: 'PATCH',
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        alert('Ticket cancelled successfully.');
        fetchTickets(); // Refresh ticket list
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
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <div className="flex flex-col items-center mb-6">
        <img
          src={userDetails?.profilePic}
          alt="profilepic"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800">{`Welcome ${userDetails?.name}`}</h1>
        <p className="text-gray-600">Email ID: {userDetails?.email}</p>
        <p className="text-gray-600">Mobile: {userDetails?.mobile}</p>
      </div>

      <div className="flex gap-4 mb-6">
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={() => setShowOrders(!showOrders)}
        >
          My Orders
        </button>
        <button
           className="px-6 py-2 bg-teal-500 rounded-lg hover:bg-teal-600"
           onClick={() => setShowChangePassword(true)}
        >
           Change Password
        </button>
        {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
        )}

       <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
  Logout
</button>
      </div>

      {showOrders && (
        <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full mt-4">
          {loadingTickets ? (
            <p className="text-center text-gray-600">Loading your tickets...</p>
          ) : ticketError ? (
            <p className="text-center text-red-500">{ticketError}</p>
          ) : userTickets.length === 0 ? (
            <p className="text-center text-gray-600">You have no tickets yet.</p>
          ) : (
            <ul className="space-y-4">
              {userTickets.map((ticket) => (
                <li
                  key={ticket._id}
                  className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-lg">Ticket #{ticket.ticketNumber}</p>
                    <p className="text-gray-700">Seat: {ticket.seatNumber}</p>
                    <p className="text-gray-700">Status: {ticket.status}</p>
                    <p className="text-gray-700">Price: ₹{ticket.price}</p>
                    <p className="text-gray-700">
                      Booking Time: {new Date(ticket.bookingTime).toLocaleString()}
                    </p>
                  </div>
                  {ticket.status === 'booked' && (
                    <button
                      disabled={isCancelling === ticket._id}
                      className={`mt-4 md:mt-0 px-4 py-2 text-white rounded ${
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
