import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'


const LatestFilm = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestFilm = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace with your own logic for fetching the latest film
        const response = await fetch(
          `https://www.omdbapi.com/?s=latest&apikey=YOUR_OMDB_API_KEY`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details.");
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        // Assuming the first movie is the "latest"
        setMovie(data.Search[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestFilm();
  }, []);
};


function Home() {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchLatestFilm = async () => {
        setLoading(true);
        setError(null);
  
        try {
          // Replace with your own logic for fetching the latest film
          const response = await fetch(
            `https://www.omdbapi.com/?s=latest&apikey=4fa427c0`
          );
  
          if (!response.ok) {
            throw new Error("Failed to fetch movie details.");
          }
  
          const data = await response.json();
  
          if (data.Response === "False") {
            throw new Error(data.Error);
          }
  
          // Assuming the first movie is the "latest"
          setMovie(data.Search[0]);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchLatestFilm();
    }, []);



       


    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to see latest films
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className=' w-screen  py-8'>
          
                <div className=' flex justify-center w-full '>
                <div style={{width:"900px" ,fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center" }}>
      <h1  style={{ fontSize: '36px',  color: 'white', textAlign: 'center' }}>Latest Film</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {movie && (
        <div className=' '
          style={{
          width: "900px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            display:'flex',
            flexDirection: "horizontal"
          
          }}
        >
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.Title}
            style={{ width: "900px",height:"600px", borderRadius: "10px" }}
          />
         <div style={ {display:'flex',alignItems:'center', justifyContent:'center', color:'white',  height: "600px",
            flexDirection: "column", width:"500px"}}> <span style={{ margin: "10px 0" }}>{movie.Title}</span>
          <h2>
            <strong>Year:</strong> {movie.Year}
          </h2>
         
          </div>
        </div>
      )}
    </div>
                </div>
            
        </div>
    )
}

export default Home