import React from 'react';
import { FilmCards } from '../../components/user/Cards';
import { FilmCardSkeleton } from '../../components/user/Skeletons';
import { Usefetch } from '../../hooks/Usefetch';

export const Films = () => {
  const [filmList, isLoading, error] = Usefetch("/film/film-list");

  if (isLoading) {
    return <FilmCardSkeleton />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Now Showing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filmList?.map((film) => (
          <FilmCards film={film} key={film?._id} />
        ))}
      </div>
    </div>
  );
};
