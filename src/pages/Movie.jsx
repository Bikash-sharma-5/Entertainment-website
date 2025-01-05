import React, { useState } from "react";


const Movie = () => {
  const [query, setQuery] = useState(""); // State to hold the search query
  const [movie, setMovie] = useState(null); // State to hold movie data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchMovieData = async () => {
    if (!query) {
      alert("Please enter a movie title!");
      return;
    }

    setLoading(true);
    setError(null);
    setMovie(null);

    try {
      const apiKey = "4fa427c0"; // Replace with your OMDb API key
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error);
      }

      setMovie(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="w-full  minHeight: '100vh', display: 'flex', flexDirection: 'column' py-8 mt-4 text-center">
  
     <div style={{ padding: "20px",alignItems:"column", fontFamily: "Arial, sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{color:"white"}}>Movie Search</h1>
     <div style={{display: 'flex', flexDirection: 'row' ,justifyContent:"center" }}>
     <input
        type="text"
        placeholder="Enter movie title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width:"1100px",
          height:"50px",
          padding: "10px",
          marginRight: "10px",
        
          fontSize: "16px",
        }}
      />
      <button
        onClick={fetchMovieData}
        className="bg-blue-100 rounded-full"
        style={{
          width:"200px",
          height:"50px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor:"blue-100"
        }}
      >
        Search
      </button>
     </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {movie && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
          <h2 style={{color:"white"}}>{movie.Title} ({movie.Year})</h2>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.Title}
            style={{ width: "200px", marginBottom: "20px" }}
          />
          <p style={{color:"white"}}><strong>Genre:</strong> {movie.Genre}</p>
          <p style={{color:"white"}}><strong>Director:</strong> {movie.Director}</p>
          <p style={{color:"white"}}><strong>Actors:</strong> {movie.Actors}</p>
          <p style={{color:"white"}}><strong>Plot:</strong> {movie.Plot}</p>
          <p style={{color:"white"}}><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
          <p style={{color:"white"}}><strong>Runtime:</strong> {movie.Runtime}</p>
          <p style={{color:"white"}}><strong>Released:</strong> {movie.Released}</p>
          <p style={{color:"white"}}><strong>Language:</strong> {movie.Language}</p>
          <p style={{color:"white"}}><strong>Country:</strong> {movie.Country}</p>
          <p style={{color:"white"}}><strong>Awards:</strong> {movie.Awards}</p>
        </div>
      )}
    </div>
   
   </div>
  );
};

export default Movie;
