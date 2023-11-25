import React, { useCallback, useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import MovieDetail from "./MovieDetail";
import Favorites from "./Favorites";
import MovieList from "./MovieList";

const API_ENDPOINT = "http://www.omdbapi.com/?apikey=37891927&s=";
const MOVIE_FETCH_INIT = "MOVIE_FETCH_INIT";
const MOVIE_FETCH_SUCCESS = "MOVIE_FETCH_SUCCESS";
const MOVIE_FETCH_FAILURE = "MOVIE_FETCH_FAILURE";
const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";

function debounceEvent(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const movieReducer = (state, action) => {
  switch (action.type) {
    case MOVIE_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case MOVIE_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        movies: action.payload,
      };
    case MOVIE_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

function App() {
  const [searchTerm, setSearchTerm] = useState("peace");

  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    favorites: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchMovies = async (searchTerm) => {
    dispatch(MOVIE_FETCH_INIT);

    try {
      const result = await axios.get(`${API_ENDPOINT}${searchTerm}`);
      dispatch({
        type: MOVIE_FETCH_SUCCESS,
        payload: result.data.Search,
      });
    } catch {
      dispatch(MOVIE_FETCH_FAILURE);
    }
  };

  const debouncedFetchMovies = useCallback(
    debounceEvent(handleFetchMovies, 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFetchMovies(value);
  };

  const addToFavorites = (movie) => {
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: movie,
    });
  };

  useEffect(() => {
    debouncedFetchMovies(searchTerm);
  }, [debouncedFetchMovies]);

  return (
    <Router>
      <Routes>
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route
          path="/favorites"
          element={<Favorites favorites={state.favorites} />}
        />
        <Route
          path="/movies"
          element={
            <MovieList
              state={state}
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              addToFavorites={addToFavorites}
            />
          }
        />
        <Route path="/" element={<Link to="/movies">Movie List</Link>} />
      </Routes>
    </Router>
  );
}

export default App;
