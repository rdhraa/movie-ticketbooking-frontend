import React, { useState, useEffect } from 'react';

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/avatar.webp",
    "/avengers.jpg",
    "/interstellar.webp",
    "/jungle-book.webp",
    "/the-dark-knight.jpg",
    "/venom.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      {/* Carousel Container */}
      <div
  className="flex transition-transform duration-1000 ease-in-out"
  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
>
  {images.map((image, index) => (
    <div key={index} className="carousel-item w-full flex-shrink-0">
      <img
        src={image}
        alt={`Slide ${index + 1}`}
        className="w-full object-cover max-h-[500px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
      />
    </div>
  ))}
</div>
      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index ? 'bg-white' : 'bg-white/60'
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
};
