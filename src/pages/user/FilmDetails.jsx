import React from 'react'
import { Usefetch } from '../../hooks/Usefetch'
import { useParams } from 'react-router-dom'



export const FilmDetails = () => {
  const params = useParams()
  console.log(params, "====params")
  const [filmDetails, isLoading, error] = Usefetch(`/film/about-film/${params?.id}`)

  if (isLoading) return <div className="text-center text-lg font-semibold">Loading...</div>
  if (error) return <div className="text-center text-lg font-semibold text-red-500">Error loading film details!</div>

  const genres = Array.isArray(filmDetails?.genre) ? filmDetails?.genre.join(", ") : filmDetails?.genre;

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          {/* Film Image */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img src={filmDetails?.Image} alt="Film" className="rounded-lg shadow-md w-full h-auto object-cover" />
          </div>
          
          {/* Film Details */}
          <div className="md:ml-6 w-full md:w-2/3">
            <h1 className="text-3xl font-semibold mb-4">{filmDetails?.title}</h1>
            
            <div className="text-lg mb-4">
              <p><strong>Genre:</strong> {genres}</p>
              <p><strong>Language:</strong> {filmDetails?.language}</p>
              <p><strong>Duration:</strong> {filmDetails?.duration} minutes</p>
              <div className="flex justify-between items-center">
                <p><strong>Rating:</strong> {filmDetails?.rating}</p>
               
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition duration-200">
                  Rate Now
                </button>
              </div>
            </div>

            

            {/* Book Tickets Button */}
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200">
              Book Tickets Now
            </button>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold mt-8 mb-4 text-center">About The Movie</h1>
      <p className="mb-6">{filmDetails?.description}</p>
    </div>
  )
}
