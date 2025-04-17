import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import { Button } from "../../components/theater/Button";
import { toast } from "react-hot-toast";
import { EditFilmModal } from "../../components/theater/EditFilmModal";

export const MyFilms = () => {
  const [films, setFilms] = useState([]);
  const [expandedFilmId, setExpandedFilmId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingFilm, setEditingFilm] = useState(null);
  const fetchFilms = async () => {
    try {
      const res = await axiosInstance.get("/film/my-films", {
        withCredentials: true,
      });
      console.log("Fetched films:", res.data);
      setFilms(Array.isArray(res.data.films) ? res.data.films : []);
    } catch (err) {
      console.error("Failed to fetch films", err);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const handleEdit = (film) => {
    setEditingFilm(film);
  };
  

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this film?")) return;

    try {
      await axiosInstance.delete(`/film/${id}`, {
        withCredentials: true,
      });
      toast.success("Film deleted");
      fetchFilms();
    } catch (err) {
      console.error("Failed to delete film", err);
      toast.error("Failed to delete");
    }
  };

  const toggleExpand = (id) => {
    setExpandedFilmId(expandedFilmId === id ? null : id);
  };
  
  const filteredFilms = films.filter((film) => {
    const title = typeof film.title === "string" ? film.title.toLowerCase() : "";
    
    const genre = Array.isArray(film.genre)
      ? film.genre.join(" ").toLowerCase()
      : typeof film.genre === "string"
      ? film.genre.toLowerCase()
      : "";
  
    const search = searchTerm.toLowerCase();
  
    return title.includes(search) || genre.includes(search);
  });
  
  

  return (
    <div className="min-h-screen ">
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 ">🎞️ My Films</h1>

      <input
        type="text"
        placeholder="Search by title or genre..."
        className="w-full p-2 mb-6 border rounded "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-4">
        {filteredFilms.map((film) => (
          <div
            key={film._id}
            className="p-4 border rounded shadow bg-white hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-black">{film.title}</h2>
                <p className="text-sm text-gray-600">{film.genre}</p>
              </div>
              <div className="space-x-2">
                <Button onClick={() => toggleExpand(film._id)} className="text-gray-800">
                  {expandedFilmId === film._id ? "Collapse" : "Details"}
                </Button>
                <Button onClick={() =>  handleEdit(film)} className="text-gray-800">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(film._id)} className="bg-red-500 hover:bg-red-600">
                  Delete
                </Button>
              </div>
            </div>

            {expandedFilmId === film._id && (
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p><strong>Description:</strong> {film.description}</p>
                <p><strong>Duration:</strong> {film.duration} minutes</p>
                <p><strong>Release Date:</strong> {new Date(film.releaseDate).toDateString()}</p>
                <p><strong>Director:</strong> {film.director}</p>
                <p><strong>Cast:</strong> {film.cast}</p>
                <p><strong>Language:</strong> {film.language}</p>
                <p><strong>Rating:</strong> {film.rating}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    {editingFilm && (
      <EditFilmModal
        film={editingFilm}
        onClose={() => setEditingFilm(null)}
        onSave={fetchFilms}
      />
    )}
    </div>
  );
};
