import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";


export const MoviesListPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axiosInstance.get("/admin/movies");
        console.log(res.data.data)
        setMovies(res.data.data);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((film) => (
          <div key={film._id} className="border rounded p-4 shadow-sm bg-white">
            <img src={film.Image} alt={film.title} className="h-48 w-full object-cover object-center rounded" />
            <h3 className="text-lg font-semibold mt-2 text-black">{film.title}</h3>
            <p className="text-sm text-gray-600">{film.genre.join(", ")}</p>
            <p className="text-sm text-gray-500 mt-1">By: {film.theater?.name || "Unknown Theater"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


