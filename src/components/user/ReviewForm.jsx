import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosinstance';
import toast from 'react-hot-toast';

export const ReviewForm = ({ filmId, user }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating!');
      return;
    }
    
    try {
    
      const response = await axiosInstance.post('/review/add-review', {
        filmId: filmId,
        rating: rating,  
        comment: comment,  
      });

      toast.success('Review submitted!');
      setRating(0); 
      setComment(''); 

    } catch (err) {
      console.error('Error submitting review:', err);
      toast.error('Failed to submit review.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-white font-semibold mb-2">Rating:</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl ${
                star <= rating ? 'text-yellow-400' : 'text-gray-500'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">Comment:</label>
        <textarea
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          rows="4"
          placeholder="Write your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Submit Review
      </button>
    </form>
  );
};

