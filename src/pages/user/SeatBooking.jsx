import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { axiosInstance } from '../../config/axiosinstance';
import { Usefetch } from '../../hooks/Usefetch';

export const SeatBooking = () => {
  const params = useParams();

  const [showDetails, isLoading, error] = Usefetch(`/screening/film/${params.filmId}`);
  const [filmDetails, setFilmDetails] = useState(null);
  const [filmDetailsData, filmDetailsLoading, filmDetailsError] = Usefetch(`/film/about-film/${params.filmId}`);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const makePayment = async () => {
    try {
      setIsProcessing(true);
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

      const payload = {
        filmTitle: filmDetails.title,
        theaterName: showDetails[0].theaterId.name,
        showtime: showDetails[0].showtime,
        selectedSeats,
        totalAmount: selectedSeats.length * showDetails[0].price,
        pricePerSeat: showDetails[0].price,
      };

      localStorage.setItem('bookingDetails', JSON.stringify({
        screeningId: showDetails[0]._id,
        numSeats: selectedSeats.length,
        seatNumbers: selectedSeats,
      }));

      const session = await axiosInstance({
        url: '/payment/create-checkout-session',
        method: 'POST',
        data: payload,
      });

      const result = await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.log("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (filmDetailsData) {
      setFilmDetails(filmDetailsData);
    }
  }, [filmDetailsData]);

  if (isLoading || filmDetailsLoading || !showDetails || !filmDetails) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (error || filmDetailsError) {
    return <p className="text-center text-xl text-red-500">Error loading data.</p>;
  }

  if (showDetails && showDetails.length === 0) {
    return <p className="text-center text-xl text-red-500">No screenings available for this film.</p>;
  }

  if (showDetails && showDetails.length > 0 && filmDetails) {
    const { theaterId, showtime, price, bookedSeats = [], screenName } = showDetails[0];
    const filmName = filmDetails.title;
    const theaterName = theaterId?.name || 'Unknown Theater';
    const formattedShowtime = new Date(showtime).toLocaleString();

    const theaterScreens = theaterId.screens || [];
    const currentScreen = theaterScreens.find(screen => screen.name === screenName);
    const totalSeats = currentScreen?.capacity || 0;

    const seatsPerRow = 10;
    const numRows = Math.ceil(totalSeats / seatsPerRow);
    const dynamicSeatLayout = [];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < seatsPerRow; col++) {
        const seatNumber = row * seatsPerRow + col + 1;
        if (seatNumber > totalSeats) break;
        const seatLabel = `${String.fromCharCode(65 + row)}${col + 1}`;
        dynamicSeatLayout.push(seatLabel);
      }
    }

    const handleSeatClick = (seat) => {
      if (!bookedSeats.includes(seat)) {
        setSelectedSeats(prev =>
          prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
        );
      }
    };

    const totalAmount = selectedSeats.length * price;

    return (
      <div className="container mx-auto p-4">
        {/* Film and Show Info */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{filmName}</h1>
          <p className="text-xl mb-2"><strong>Theater:</strong> {theaterName}</p>
          <p className="text-lg mb-2"><strong>Showtime:</strong> {formattedShowtime}</p>
          <p className="text-lg mb-2"><strong>Price:</strong> Rs{price}</p>
          <p className="text-lg mb-2"><strong>Screen:</strong> {screenName}</p>
          <p className="text-lg mb-2"><strong>Total Seats:</strong> {totalSeats}</p>
          <p className="text-lg"><strong>Booked:</strong> {bookedSeats.join(', ')}</p>
        </div>

        {/* Seat Legend */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
            <span>Booked</span>
          </div>
        </div>

        {/* Seat Layout */}
        <div className="overflow-x-auto mb-8">
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${seatsPerRow}, minmax(0, 1fr))` }}
          >
            {dynamicSeatLayout.map((seat, index) => {
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);
              return (
                <button
                  key={index}
                  aria-label={`Seat ${seat} ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                  className={`aspect-square w-full rounded-lg text-white font-semibold text-sm sm:text-base ${
                    isBooked ? 'bg-gray-400 cursor-not-allowed'
                    : isSelected ? 'bg-blue-500' : 'bg-green-500 hover:bg-green-700'
                  }`}
                  disabled={isBooked}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Screen Indicator */}
        <div className="flex justify-center items-center mb-8">
          <div className="w-full h-10 bg-yellow-500 text-white flex justify-center items-center rounded-lg">
            SCREEN THIS WAY
          </div>
        </div>

        {/* Summary */}
        <div className="text-center mb-8">
          <p><strong>Selected Seats:</strong> {selectedSeats.join(', ') || 'None'}</p>
          <p><strong>Total: </strong> Rs{totalAmount}</p>
        </div>

        {/* Pay Button */}
        <div className="text-center">
          <button
            className={`px-6 py-2 rounded-lg text-white ${selectedSeats.length === 0 || isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700'
            }`}
            disabled={selectedSeats.length === 0 || isProcessing}
            onClick={makePayment}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    );
  }

  return <p className="text-center text-xl text-red-500">No show or film details available.</p>;
};
