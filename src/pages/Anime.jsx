import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Anime = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

  // Fetch anime genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${JIKAN_BASE_URL}/genres/anime`);
        setGenres(response.data.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch anime based on the selected genre
  const fetchAnimeByGenre = async (genreId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${JIKAN_BASE_URL}/anime`, {
        params: { genres: genreId, order_by: 'score', sort: 'desc' },
      });
      setAnimeList(response.data.data);
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    if (genreId) {
      fetchAnimeByGenre(genreId);
    } else {
      setAnimeList([]);
    }
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <h1 style={{color:'white'}}>Anime Tracker with Recommendations</h1>

      {/* Genre Selector */}
      <label htmlFor="genre" style={{color:'white'}}>Choose a Genre:</label>
      <select
        id="genre"
        value={selectedGenre}
        onChange={handleGenreChange}
        style={{ margin: '10px', padding: '5px' }}
      >
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre.mal_id} value={genre.mal_id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Loading State */}
      {loading && <p>Loading anime...</p>}

      {/* Anime Display */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        {animeList.map((anime) => (
          <div
            key={anime.mal_id}
            style={{
              width: '200px',
              padding: '10px',
              color:'white', 
              border: '1px solid #ddd',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              style={{ width: '100%', borderRadius: '5px' }}
            />
            <h3 style={{ fontSize: '1rem',color:'white', margin: '10px 0' }}>{anime.title}</h3>
            <p style={{ fontSize: '1rem',color:'white'} }>Score: {anime.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Anime;
