import React from 'react';
import { Usefetch } from '../../hooks/Usefetch';
import { useNavigate, useParams } from 'react-router-dom';

export const FilmDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [filmDetails, isLoading, error] = Usefetch(`/film/about-film/${params?.id}`);

  if (isLoading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-lg font-semibold text-red-500">Error loading film details!</div>;

  const genres = Array.isArray(filmDetails?.genre) ? filmDetails?.genre.join(', ') : filmDetails?.genre;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Film Image */}
          <div className="w-full md:w-1/3">
            <img
              src={filmDetails?.Image}
              alt={filmDetails?.title}
              className="rounded-xl w-full h-auto object-cover shadow-md"
            />
          </div>

          {/* Film Details */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold mb-4">{filmDetails?.title}</h1>

              <div className="text-base sm:text-lg space-y-2 mb-4">
                <p><strong>Genre:</strong> {genres}</p>
                <p><strong>Language:</strong> {filmDetails?.language}</p>
                <p><strong>Duration:</strong> {filmDetails?.duration} minutes</p>
                <div className="flex items-center justify-between">
                  <p><strong>Rating:</strong> {filmDetails?.rating}</p>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition duration-200">
                    Rate Now
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/screening/film/${filmDetails?._id}`)}
              className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
            >
              Book Tickets Now
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">About The Movie</h2>
        <p className="text-base sm:text-lg text-gray-300 text-justify">{filmDetails?.description}</p>
      </div>
    </div>
  );
};
