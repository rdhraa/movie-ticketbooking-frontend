import React from 'react'
import { FilmCards } from '../../components/user/Cards';
import { CourseCardSkeleton } from '../../components/user/Skeletons';
import { Usefetch } from '../../hooks/Usefetch';
export const Films = () => {
    const [filmList,isLoading,error]=Usefetch("/film/film-list")

    if(isLoading){
        return <CourseCardSkeleton/>
    }


  return (
    <div>
      <h1 className="text-3xl font-bold mt-8 mb-4 text-center">Now Showing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filmList?.map((value) => {
                return <FilmCards film={value} key={value?._id} />;
              })}
      </div>
    </div>
  )
}


