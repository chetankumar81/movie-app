import React from "react";
import { Link } from "react-router-dom";

import { MovieCard } from "./MovieList";

import styles from "./Favorites.module.css";

const Favorites = ({ favorites }) => {
  return (
    <div className={styles.favorites}>
      <Link className={styles.movieLink} to="/movies">
        View Movie List
      </Link>
      <h2>Favorites</h2>
      {favorites ? (
        <div>
          {favorites.map((movie) => (
            <div key={movie.imdbID}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <p>No Favorites Found</p>
      )}
    </div>
  );
};

export default Favorites;
