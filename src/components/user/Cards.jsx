import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FilmCards = ({ film }) => {
 const navigate = useNavigate()
   
  return (
    <div className="card bg-base-100 rounded-lg shadow-lg overflow-hidden w-48 mx-2 my-4" role='btn' onClick={()=>navigate(`/about-film/${film?._id}`)}>
      <img src={film?.Image} alt={film?.title} className="w-full h-auto object-cover" />
      <div className="p-4 text-center">
        <p className="text-yellow-500 text-sm font-semibold">{film?.rating} ★</p>
        <h3 className="text-lg font-bold mt-2">{film?.title}</h3>
      </div>
    </div>
  );
};







