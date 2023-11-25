import React from "react";
import { Link } from "react-router-dom";

const MovieList = ({
  state,
  searchTerm,
  handleSearchChange,
  addToFavorites,
}) => {
  return state ? (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {state.isError && <p>Somethig went wrong ....</p>}

      {!state.isLoading ? (
        <div>
          {state.movies ? (
            <ul>
              {state.movies.map((movie) => (
                <li key={movie.imdbID}>
                  <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
                  <button onClick={() => addToFavorites(movie)}>
                    Add to Favorites
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Movies Found, please change the search</p>
          )}

          <Link to="/favorites">View Favorites</Link>
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  ) : null;
};

export default MovieList;
