import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { toast } from "react-hot-toast";
import { Button } from "../../components/theater/Button";
import { Link } from "react-router-dom";

export const UsersListPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/users");
      setUsers(data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = async (id) => {
    try {
      const res = await axiosInstance.put(`/admin/users/deactivate/${id}`);
      toast.success(res.data.message);
      fetchUsers(); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to toggle user");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      {/* Responsive scroll wrapper */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="w-full border border-gray-300 rounded text-sm sm:text-base">
            <thead>
              <tr>
                <th className="p-3 text-left whitespace-nowrap">Name</th>
                <th className="p-3 text-left whitespace-nowrap">Email</th>
                <th className="p-3 text-left whitespace-nowrap">Mobile</th>
                <th className="p-3 text-left whitespace-nowrap">Status</th>
                <th className="p-3 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.mobile}</td>
                  <td className="p-3">{user.isActive ? "Active" : "Inactive"}</td>
                  <td className="p-3 space-x-2 whitespace-nowrap">
                    <Button onClick={() => toggleUserStatus(user._id)} size="sm">
                      {user.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button onClick={() => deleteUser(user._id)} variant="danger" size="sm">
                      Delete
                    </Button>
                    <Link to={`/admin/users/${user._id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 ">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
