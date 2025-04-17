import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosinstance";
import { toast } from "react-hot-toast";
import { Button } from "../../components/theater/Button";

const UserProfileView = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get(`/admin/users/${userId}`);
      setUser(data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch user");
      navigate("/admin/users");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="shadow rounded p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <img
          src={user.profilePic}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={user.isActive ? "text-green-600" : "text-red-600"}>
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </p>
          <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <p><strong>Updated:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
          <div className="mt-4">
            <Button className="border-2" onClick={() => navigate("/admin/users")}>Back to Users</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
