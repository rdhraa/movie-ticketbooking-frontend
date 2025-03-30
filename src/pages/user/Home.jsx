import React from 'react'
import { Carousel } from '../../components/shared/Carousel'
import { FilmCards } from '../../components/user/Cards'
import { CourseCardSkeleton } from '../../components/user/Skeletons';
import { Usefetch } from '../../hooks/Usefetch';

const Home = () => {
  const [filmList, isLoading, error] = Usefetch("/film/film-list");
  
  if (isLoading) {
    return <CourseCardSkeleton />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Carousel */}
      <Carousel />

      {/* Recommended Movies Section */}
      <h1 className="text-3xl font-bold mt-8 mb-4 text-center">Recommended Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filmList?.map((value) => {
          return <FilmCards film={value} key={value?._id} />;
        })}
      </div>

      {/* Trending Now Section */}
      <h1 className="text-3xl font-bold mt-8 mb-4 text-center">Trending Now</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filmList?.map((value) => {
          return <FilmCards film={value} key={value?._id} />;
        })}
      </div>
    </div>
  );
}

export default Home;

