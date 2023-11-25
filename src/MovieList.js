import React from "react";
import { Link } from "react-router-dom";

import styles from "./MovieList.module.css";

export const MovieCard = ({ movie }) => (
  <div className={styles.card}>
    <div className={styles.poster}>
      <img src={movie.Poster}></img>
    </div>
    <div>
      <p>Title: {movie.Title}</p>
      <p>Type: {movie.Type}</p>
      <p>Year: {movie.Year}</p>
    </div>
  </div>
);

const MovieList = ({
  state,
  searchTerm,
  handleSearchChange,
  addToFavorites,
}) => {
  return (
    <div className={styles.movieList}>
      <Link className={styles.favoriteLink} to="/favorites">
        View Favorites
      </Link>
      {state ? (
        <div className={styles.movieCardListContainer}>
          <div className={styles.search}>
            Search movie by title:{" "}
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {state.isError && <p>Somethig went wrong ....</p>}

          {!state.isLoading ? (
            <div>
              {state.movies ? (
                <div className={styles.movieCardList}>
                  {state.movies.map((movie) => (
                    <div className={styles.movieCard} key={movie.imdbID}>
                      <Link
                        to={`/movie/${movie.imdbID}`}
                        style={{ border: "1px solid black" }}
                      >
                        <MovieCard movie={movie} />
                      </Link>
                      <button
                        className={styles.favoriteBtn}
                        onClick={() => addToFavorites(movie)}
                      >
                        Add to Favorites
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No Movies Found, please change the search</p>
              )}
            </div>
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      ) : null}
      ;
    </div>
  );
};

export default MovieList;
