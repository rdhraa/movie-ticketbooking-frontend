import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const FilmCards = ({ film }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate(`/about-film/${film?._id}`)}
      className="bg-gray-900 rounded-xl shadow-md hover:shadow-2xl overflow-hidden w-full sm:w-44 md:w-48 lg:w-56 mx-auto my-4 cursor-pointer transition-all duration-300"
    >
      <img
        src={film?.Image || '/placeholder.jpg'}
        alt={film?.title}
        className="w-full h-48 sm:h-52 md:h-56 object-cover"
      />
      <div className="p-3 text-center">
        <p className="text-yellow-400 text-sm font-semibold">{film?.rating || 'N/A'} ★</p>
        <h3 className="text-sm sm:text-base font-bold mt-1 text-white truncate">{film?.title}</h3>
      </div>
    </motion.div>
  );
};
