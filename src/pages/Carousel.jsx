import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const MCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/shows" // Replace with your API endpoint
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.slice(0, 50)); // Get the top 10 movies
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Featured Movies</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="p-2 h-full">
            <div className="bg-white shadow-md h-full rounded-lg overflow-hidden">
              <img
                src={movie.image ? movie.image.medium : "https://via.placeholder.com/300x450"}
                alt={movie.name}
                className="w-full h-100 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.name}</h3>
                <p className="text-sm text-gray-500">{movie.language}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MCarousel;
