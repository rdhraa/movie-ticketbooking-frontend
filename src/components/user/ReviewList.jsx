import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";

export const ReviewList = ({ filmId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(`/review/film-reviews/${filmId}`);
        setReviews(res.data.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (filmId) fetchReviews();
  }, [filmId]);

  if (loading) return <p>Loading reviews...</p>;
  if (!reviews.length) return <p>No reviews yet.</p>;

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-xl font-semibold mb-2">User Reviews</h3>
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-gray-800 p-4 rounded-md shadow text-white"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-bold">{review.userId.name}</h4>
            <span className="text-yellow-400">{review.rating} ★</span>
          </div>
          {review.comment && (
            <p className="text-gray-300 mt-1">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

