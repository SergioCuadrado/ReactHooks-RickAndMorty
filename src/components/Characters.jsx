import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';
import useCharacters from '../hooks/useCharacters';
import Search from './Search';

import '../styles/characters.css';

const initialState = {
  favorites: [],
};

const API = 'https://rickandmortyapi.com/api/character/';

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      const validation = state.favorites.filter((favorite) => action.payload.id === favorite.id);

      if (validation.length === 0) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      } else {
        return { ...state };
      }
    default:
      return state;
  }
};

const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const characters = useCharacters(API);

  const handleClick = (favorite) => {
    dispatch({
      type: 'ADD_TO_FAVORITE',
      payload: favorite,
    });
  };

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  //cada vez que escribimos en el input, useMemo revisará si esa búsqueda ya fue realizada antes o si hay que hacerla de nuevo, si ya la hizo devuelve la lista que guardo en ese entonces, si no, ejecuta la función de filter.
  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <div className="Characters">
      <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

      <div className="Characters__favorite">
        {favorites.favorites.length ? <h2>Favorites</h2> : ''}

        {favorites.favorites.map((favorite) => (
          <li key={favorite.id}>
            <img src={favorite.image} alt={favorite.name} />
          </li>
        ))}
      </div>

      {filteredUsers.map((character) => (
        <div key={character.id} className="tarjeta">
          <img src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
          <p>
            <b>Status:</b> {character.status}
          </p>
          <p>
            <b>Gender:</b> {character.gender}
          </p>
          <p>
            <b>Species:</b> {character.species}
          </p>
          <p>
            <b>Location:</b> {character.location.name}
          </p>
          <button type="button" className="button" onClick={() => handleClick(character)}>
            Add to Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default Characters;
