import React,{useEffect,useState} from "react";
import { Card, CardContent } from "../../components/theater/Card";
import { Button } from "../../components/theater/Button";
import { BarChart3, Film, CalendarDays, DollarSign } from "lucide-react";
import { axiosInstance } from "../../config/axiosinstance";
import { useNavigate } from "react-router-dom";


export const TheaterDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalFilms: 0,
    totalBookings: 0,
    revenue: 0,
    upcomingShows: 0,
  });
    const [screenings, setScreenings] = useState([]);
    const [bookings, setBookings] = useState([]);

  
    useEffect(() => {
      const fetchDashboardStats = async () => {
        try {
          const res = await axiosInstance.get("/theater/dashboard");
          setStats(res.data.data);
        } catch (err) {
          console.error("Failed to fetch dashboard stats:", err);
        }
      };
  
      fetchDashboardStats();
    }, []);


    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          const [screeningRes, bookingRes] = await Promise.all([
            axiosInstance.get("/theater/today-screenings", { withCredentials: true }),
            axiosInstance.get("/theater/recent-bookings", { withCredentials: true }),
          ]);
  
          setScreenings(screeningRes.data.data);
          setBookings(bookingRes.data.data);
        } catch (err) {
          console.error("Dashboard fetch error:", err);
        }
      };
  
      fetchDashboardData();
    }, []);


const cards = [
    {
      label: "Total Movies",
      value: stats?.totalFilms ?? "...",
      icon: <Film className="text-purple-500" />,
    },
    {
      label: "Bookings",
      value: stats?.totalBookings ?? "...",
      icon: <BarChart3 className="text-green-500" />,
    },
    {
      label: "Revenue",
      value: stats ? `₹${stats.revenue.toLocaleString()}` : "...",
      icon: <DollarSign className="text-yellow-500" />,
    },
    {
      label: "Upcoming Shows",
      value: stats?.upcomingShows ?? "...",
      icon: <CalendarDays className="text-blue-500" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
    <h1 className="text-3xl font-bold text-purple-700 mb-6">Welcome Theater Owner 🎬</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((stat, index) => (
        <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h2 className="text-xl font-semibold text-black">{stat.value}</h2>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

      <div className="mt-8 flex flex-col md:flex-row gap-4">
      <Card className="flex-1">
        <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Today's Screenings</h2>
        <ul className="text-sm space-y-2 text-gray-600">
          {screenings.length > 0 ? (
            screenings.map((item) => (
              <li key={item._id}>🎥 {item.filmId?.Title} — {new Date(item.showtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
        ))
      ) : (
        <li>No screenings today</li>
      )}
    </ul>
  </CardContent>
</Card>

<Card className="flex-1">
  <CardContent className="p-4">
    <h2 className="text-lg font-semibold mb-2 text-gray-700">Recent Bookings</h2>
    <ul className="text-sm space-y-2 text-gray-600">
    {bookings?.length > 0 ? (
  bookings.map((item) => (
    <li key={item._id}>
      #{item._id.slice(-4)} - {item.filmId?.Title} - {item.status}
    </li>
    ))
  ) : (
  <li>No recent bookings</li>
     )}

    </ul>
  </CardContent>
</Card> 
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 ">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => navigate("/theater/add-film")}
        >
          Add New Movie
        </Button>
        <Button
  className="bg-green-600 hover:bg-green-700 text-white"
  onClick={() => navigate("/theater/add-screening")} 
>
  Add Screening
</Button>

<Button
  className="bg-blue-600 hover:bg-blue-700 text-white"
  onClick={() => navigate("/theater/my-screenings")} 
>
  Manage Shows
</Button>



        </div>
      </div>
    </div>
  );
};






