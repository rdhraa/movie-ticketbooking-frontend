import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { Button } from "../../components/theater/Button";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AddScreeningPage = () => {
  const [films, setFilms] = useState([]);
  const [theater, setTheater] = useState(null);
  const [formData, setFormData] = useState({
    filmId: "",
    screenName: "", 
    showtime: "",
    price: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await axiosInstance.get("/film/my-films", {
          withCredentials: true,
        });
        console.log("🎭 Theater data:", res.data.theater); 
        setFilms(res.data.films || []);
      } catch (err) {
        console.error("Error fetching films", err);
        toast.error("Failed to load films");
      }
    };
  
    const fetchTheater = async () => {
      try {
        const res = await axiosInstance.get("/theater/profile", {
          withCredentials: true,
        });
        setTheater(res.data.data); 
      } catch (err) {
        console.error("Error fetching theater", err);
        toast.error("Failed to load theater info");
      }
    };
    fetchFilms();
    fetchTheater();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { filmId,screenName, showtime, price } = formData;
    if (!filmId || !screenName ||!showtime || !price) {
      toast.error("Please fill all fields");
      return;
    }
    const selectedScreen = theater?.screens?.find(
        (screen) => screen.name === screenName
      );
      
      const availableSeats = selectedScreen?.capacity;
      

    try {
      await axiosInstance.post(
        "/screening/create-screening",
        { filmId, screenName,showtime, price,
            theaterId: theater._id,
            availableSeats, },
        { withCredentials: true }
      );
      toast.success("Screening created successfully");
      navigate("/theater/my-screenings");
    } catch (err) {
      console.error("Error creating screening", err);
      toast.error("Failed to create screening");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">Add New Screening</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Film</label>
          <select
            name="filmId"
            value={formData.filmId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select a Film --</option>
            {films.map((film) => (
              <option key={film._id} value={film._id} className="text-gray-500">
                {film.title}
              </option>
            ))}
          </select>
        </div>

        <div>
       <label className="block mb-1 font-medium">Select Screen</label>
       <select
       name="screenName"
       value={formData.screenName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
       >
       <option value="">-- Select a Screen --</option>
       {theater?.screens?.map((screen, idx) => (
        <option key={idx} value={screen.name} className="text-gray-500">
        {screen.name} (Capacity: {screen.capacity})
      </option>
       ))}
    </select>
   </div>


        <div>
          <label className="block mb-1 font-medium">Showtime</label>
          <input
            type="datetime-local"
            name="showtime"
            value={formData.showtime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white w-full">
          Create Screening
        </Button>
      </form>
    </div>
  );
};
