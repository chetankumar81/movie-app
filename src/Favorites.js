import React from "react";

const Favorites = ({ favorites }) => {
  return (
    <div>
      <h2>Favorites</h2>
      {favorites ? (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.imdbID}>{favorite.Title}</li>
          ))}
        </ul>
      ) : (
        <p>No Favorites Found</p>
      )}
    </div>
  );
};

export default Favorites;
