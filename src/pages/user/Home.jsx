import React from 'react';
import { Carousel } from '../../components/shared/Carousel';
import { FilmCards } from '../../components/user/Cards';
import { FilmCardSkeleton } from '../../components/user/Skeletons';
import { Usefetch } from '../../hooks/Usefetch';

const Home = () => {
  const [filmList, isLoading, error] = Usefetch("/film/film-list");
  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <FilmCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        Something went wrong. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Hero Carousel */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
          <Carousel />
        </div>

        {/* Recommended Movies */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 tracking-wide">
            Recommended Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filmList?.map((film) => (
              <FilmCards film={film} key={film?._id} />
            ))}
          </div>
        </section>

        {/* Trending Movies */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 tracking-wide">
            Trending Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filmList?.map((film) => (
              <FilmCards film={film} key={film?._id + "-trending"} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
