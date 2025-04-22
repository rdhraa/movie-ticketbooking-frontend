import React, { useState } from 'react';
import { Usefetch } from '../../hooks/Usefetch';
import { useNavigate, useParams } from 'react-router-dom';
import { AverageRating } from '../../components/user/AverageRating';
import { ReviewList } from '../../components/user/ReviewList';
import { ReviewModal } from '../../components/user/ReviewModal';

export const FilmDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const [filmDetails, isLoading, error] = Usefetch(`/film/about-film/${params?.id}`);

  const openReviewModal = () => setShowReviewModal(true);
  const closeReviewModal = () => setShowReviewModal(false);
  const toggleReviews = () => setShowReviews(prev => !prev);

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
              <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-yellow-600">{filmDetails?.title}</h1>

              <div className="text-base sm:text-lg space-y-2 mb-4 text-white">
                <p><strong>Genre:</strong> {genres}</p>
                <p><strong>Language:</strong> {filmDetails?.language}</p>
                <p><strong>Duration:</strong> {filmDetails?.duration} minutes</p>
                <div className="flex items-center justify-between">
                  <p className="flex gap-1 items-center">
                    <strong>Rating:</strong> <AverageRating filmId={filmDetails?._id} />
                  </p>
                  <button
                    onClick={openReviewModal}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                  >
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
        <p className="text-base sm:text-lg  text-justify">{filmDetails?.description}</p>
      </div>

      {/* Show All Reviews Button */}
      <div className="text-center mt-10">
        <button
          onClick={toggleReviews}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          {showReviews ? 'Hide Reviews' : 'Show All Reviews'}
        </button>
      </div>

      {/* Reviews Section */}
      {showReviews && (
        <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
          <ReviewList filmId={filmDetails?._id} />
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal filmId={filmDetails?._id} onClose={closeReviewModal} />
      )}
    </div>
  );
};


