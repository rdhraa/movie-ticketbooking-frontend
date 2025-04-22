import React from 'react';
import { ReviewForm } from './ReviewForm';

export const ReviewModal = ({ filmId, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg shadow-lg relative">
          <button
            className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-4 text-center">Rate This Movie</h2>
          <ReviewForm filmId={filmId} onClose={onClose} />
        </div>
      </div>
    </>
  );
};
