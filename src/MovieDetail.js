import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_ENDPOINT = "http://www.omdbapi.com/?apikey=37891927&i=";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_ENDPOINT}${id}`);
      setMovie(response.data);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {movie && (
        <div>
          <h2>{movie.Title}</h2>
          <p>{movie.Plot}</p>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
