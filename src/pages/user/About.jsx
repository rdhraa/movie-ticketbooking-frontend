import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-12 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">About CineHub</h1>
        <p className="text-base sm:text-lg mb-6 text-center">
          Welcome to CineHub, your ultimate destination for booking movie tickets with ease.
        </p>

        <div className="bg-gray-800 p-5 sm:p-8 rounded-2xl shadow-xl space-y-4 sm:space-y-6 text-sm sm:text-base">
          <p className='text-white'>
            At CineHub, we aim to bridge the gap between theaters and movie lovers by offering a
            seamless and intuitive ticket booking experience. Whether you're planning a family night
            out or catching the latest blockbuster with friends, we've got you covered.
          </p>
          <p  className='text-white'>
            We work closely with theaters to bring you up-to-date showtimes, real-time seat
            availability, and secure online payments. Our goal is to make your movie-going experience
            convenient, exciting, and hassle-free.
          </p>
          <p className='text-white'>
            Thank you for choosing CineHub. Let’s make movie nights magical again!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
