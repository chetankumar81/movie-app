import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./MovieDetail.module.css";

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
        <div className={styles.movieDetail}>
          <div>
            <img src={movie.Poster} />
          </div>
          <div>
            <h2>Title: {movie.Title}</h2>
            <p>Plot: {movie.Plot}</p>
            <p>Actors: {movie.Actors}</p>
            <p>Awards: {movie.Awards}</p>
            <p>Language: {movie.Language}</p>
            <p>Released: {movie.Released}</p>
            <p>Duration: {movie.Runtime}</p>
            <p>IMDB Rating: {movie.imdbRating}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
