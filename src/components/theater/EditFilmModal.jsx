import { useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";
import {toast} from "react-hot-toast";

export const EditFilmModal = ({ film, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: film.title,
    description: film.description,
    genre: film.genre.join(', '),
    duration: film.duration,
    releaseDate: film.releaseDate.split("T")[0], 
    director: film.director,
    cast: film.cast.join(', '),
    language: film.language,
    rating: film.rating,
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "genre" || key === "cast") {
        updatedData.append(key, formData[key].split(',').map(item => item.trim()));
      } else {
        updatedData.append(key, formData[key]);
      }
    });

    if (image) {
      updatedData.append("image", image);
    }

    try {
      await axiosInstance.put(
        `/film/update-film/${film._id}`,
        updatedData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      toast.success("Film updated successfully! 🎉")
      onSave(); 
      onClose(); 
    } catch (error) {
      console.error("Failed to update film:", error);
      toast.error("Update failed 😢")
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
        <h2 className="text-xl text-yellow-400 font-semibold mb-4 text-center">Edit Film</h2>
        <div className="grid grid-cols-2 gap-4 text-black">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" />
          <input name="duration" type="number" value={formData.duration} onChange={handleChange} placeholder="Duration (min)" className="border p-2 rounded" />
          <input name="releaseDate" type="date" value={formData.releaseDate} onChange={handleChange} className="border p-2 rounded" />
          <input name="rating" type="number" value={formData.rating} onChange={handleChange} placeholder="Rating (1-10)" className="border p-2 rounded" />
          <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genres (comma-separated)" className="border p-2 rounded col-span-2" />
          <input name="language" value={formData.language} onChange={handleChange} placeholder="Language" className="border p-2 rounded col-span-2" />
          <input name="director" value={formData.director} onChange={handleChange} placeholder="Director" className="border p-2 rounded col-span-2" />
          <input name="cast" value={formData.cast} onChange={handleChange} placeholder="Cast (comma-separated)" className="border p-2 rounded col-span-2" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded col-span-2 resize-none" rows={3} />
          <input type="file" onChange={handleFileChange} className="col-span-2" />
        </div>
        <div className="flex justify-end mt-6 gap-4">
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save
          </button>
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


