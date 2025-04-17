import React, { useState } from "react";
import { Button } from "../../components/theater/Button";
import { axiosInstance } from "../../config/axiosinstance";
import { toast } from "react-hot-toast";

export const AddMovie = () => {
const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    releaseDate: "",
    director: "",
    cast: "",
    language: "",
    rating: "",
  });
  const [poster, setPoster] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!poster) return toast.error("Please upload a poster image.");

    // setIsSubmitting(true);
    // const loadingToast = toast.loading("Uploading movie...");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("Image", poster);

    try {
      const res = await axiosInstance.post("/film/add-film", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Movie added successfully!");
      setForm({
        title: "",
        description: "",
        genre: "",
        duration: "",
        releaseDate: "",
        director: "",
        cast: "",
        language: "",
        rating: "",
      });
      setPoster(null);
    } catch (err) {
      console.error("Add movie failed:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-gray-800 shadow rounded-md">
      <h1 className="text-2xl font-bold text-purple-700">🎬 Add New Movie</h1>
      <form className="space-y-4 text-white" onSubmit={handleSubmit}>
        {[
          { name: "title", placeholder: "Title" },
          { name: "description", placeholder: "Description" },
          { name: "genre", placeholder: "Genre" },
          { name: "duration", placeholder: "Duration (minutes)" },
          { name: "releaseDate", placeholder: "Release Date", type: "date" },
          { name: "director", placeholder: "Director" },
          { name: "cast", placeholder: "Cast (comma-separated)" },
          { name: "language", placeholder: "Language" },
          { name: "rating", placeholder: "Rating (e.g. PG-13)" },
        ].map(({ name, placeholder, type = "text" }) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full p-2 border rounded"
            value={form[name]}
            onChange={handleChange}
            required
          />
        ))}

        <input
          type="file"
          accept="image/*"
          name="Image"
          onChange={handlePosterChange}
          className="w-full p-2 border rounded"
        />
        {poster && <p className="text-sm text-gray-600">Selected: {poster.name}</p>}

        <Button
         type="submit"
         className="bg-purple-600 text-white w-full flex justify-center items-center gap-2 px-4 py-2 rounded-md disabled:opacity-70"
         disabled={isSubmitting}
       >
       {isSubmitting ? (
       <>
      <span className="loader ease-linear rounded-full border-4 border-t-4 border-white border-t-purple-300 h-5 w-5 animate-spin"></span>
      Uploading...
    </>
  ) : (
    "Add Movie"
  )}
</Button>
      </form>
    </div>
    
  );
};
