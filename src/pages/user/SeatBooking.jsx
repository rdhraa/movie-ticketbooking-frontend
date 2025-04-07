import React, { useEffect, useState } from 'react';
import { Usefetch } from '../../hooks/Usefetch'; 
import { useParams } from 'react-router-dom';
import {loadStripe} from "@stripe/stripe-js"
import { axiosInstance } from '../../config/axiosinstance';



export const SeatBooking = () => {
  const params = useParams(); 

  // Fetching data
  const [showDetails, isLoading, error] = Usefetch(`/screening/film/${params.filmId}`);
  const [filmDetails, setFilmDetails] = useState(null);
  const [filmDetailsData, filmDetailsLoading, filmDetailsError] = Usefetch(`/film/about-film/${params.filmId}`);
  const [selectedSeats, setSelectedSeats] = useState([]);

 //payment

 const makePayment = async () => {
  try {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

    const payload = {
      filmTitle: filmDetails.title,
      theaterName: showDetails[0].theaterId.name,
      showtime: showDetails[0].showtime,
      selectedSeats,
      totalAmount: selectedSeats.length * showDetails[0].price,
      pricePerSeat: showDetails[0].price,
    };

    console.log("Sending to backend:", payload);

    const session = await axiosInstance({
      url: "/payment/create-checkout-session",
      method: "POST",
      data: {
        filmTitle: filmDetails.title,
        theaterName: showDetails[0].theaterId.name,
        showtime: showDetails[0].showtime,
        selectedSeats,
        totalAmount: selectedSeats.length * showDetails[0].price,
        pricePerSeat: showDetails[0].price,
      },
    });

    console.log(session, "=======session");

    const result = await stripe.redirectToCheckout({
      sessionId: session.data.sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  } catch (error) {
    console.log("Payment error:", error);
  }
};


  // Fetch film details when available
  useEffect(() => {
    if (filmDetailsData) {
      setFilmDetails(filmDetailsData);
    }
  }, [filmDetailsData]);

  // Handle loading and error states
  if (isLoading || filmDetailsLoading || !showDetails || !filmDetails) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (error || filmDetailsError) {
    return <p className="text-center text-xl text-red-500">Error loading show details or film details.</p>;
  }

  if (showDetails && showDetails.length > 0 && filmDetails) {
    const { filmId, theaterId, showtime, price, availableSeats, totalSeats, bookedSeats = [] } = showDetails[0];
    const filmName = filmDetails.title;
    const theaterName = theaterId ? theaterId.name : "Unknown Theater";
    const formattedShowtime = new Date(showtime).toLocaleString();
    
    // Create seat layout
    const rows = 10;
    const columns = 15;
    const seatLayout = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const seatLabel = `${String.fromCharCode(65 + row)}${col + 1}`;
        seatLayout.push(seatLabel);
      }
    }

    // Handle seat selection logic
    const handleSeatClick = (seat) => {
      if (!bookedSeats.includes(seat)) { // Ensure the seat isn't booked
        setSelectedSeats((prevSelectedSeats) => {
          const newSelectedSeats = prevSelectedSeats.includes(seat)
            ? prevSelectedSeats.filter((s) => s !== seat) // Deselect seat
            : [...prevSelectedSeats, seat]; // Select seat
          return newSelectedSeats;
        });
      }
    };

    // Calculate total amount based on selected seats
    const totalAmount = selectedSeats.length * price;

    return (
      <div className="container mx-auto p-4">
        {/* Film Details */}
        

<div className="mb-8">
    {/* Film Name in Top Left Corner */}
    <h1 className="text-4xl font-bold mb-2">{filmName}</h1>
    
    {/* Theater Name */}
    <p className="text-xl mb-2"><strong>Theater:</strong> {theaterName}</p>

    {/* Showtime */}
    <p className="text-lg mb-2"><strong>Showtime:</strong> {formattedShowtime}</p>

    {/* Price */}
    <p className="text-lg mb-2"><strong>Price:</strong> Rs{price}</p>

    {/* Available Seats */}
    <p className="text-lg mb-2"><strong>Available Seats:</strong> {availableSeats}</p>

    {/* Booked Seats */}
    <p className="text-lg"><strong>Booked Seats:</strong> {bookedSeats.join(', ')}</p>
  </div>


        {/* Seat Layout */}
        <div className="grid grid-cols-15 gap-2 mb-8">
          {seatLayout.map((seat, index) => {
            const isBooked = bookedSeats.includes(seat); // Check if the seat is booked
            const isSelected = selectedSeats.includes(seat); // Check if the seat is selected
            return (
              <button
                key={index}
                className={`w-14 h-14 rounded-lg text-white font-semibold ${
                  isBooked ? 'bg-gray-400 cursor-not-allowed' : isSelected ? 'bg-blue-500' : 'bg-green-500 hover:bg-green-700'
                }`}
                disabled={isBooked}
                onClick={() => handleSeatClick(seat)}
              >
                {seat}
              </button>
            );
          })}
        </div>

        {/* Screen Representation */}
        <div className="flex justify-center items-center mb-8">
          <div className="w-full h-10 bg-yellow-500 text-white flex justify-center items-center rounded-lg">
            SCREEN THIS WAY
          </div>
        </div>

        {/* Selected Seats and Total Price */}
        <div className="text-center mb-8">
          <p><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
          <p><strong>Total: </strong> Rs{totalAmount}</p>
        </div>

        {/* Payment Button */}
        <div className="text-center">
          <button className={`px-6 py-2 rounded-lg text-white ${selectedSeats.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-700'
  }`} onClick={makePayment}>
            Proceed to Payment
          </button>
        </div>
      </div>
    );
  }

  return <p className="text-center text-xl text-red-500">No show or film details available.</p>;
};
