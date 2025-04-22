import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosinstance";

export const AverageRating = ({ filmId }) => {
  const [average, setAverage] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axiosInstance.get(`/review/avg-rating/${filmId}`);
        setAverage(res.data.data);
      } catch (error) {
        setAverage(null); 
      }
    };

    if (filmId) fetchRating();
  }, [filmId]);

  return (
    <span>
      {average ? `${average.toFixed(1)} ★` : "No ratings yet"}
    </span>
  );
};


