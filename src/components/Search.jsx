import React from 'react';

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="Search">
      <input placeholder="Search" className="Search__input" ref={searchInput} type="text" value={search} onChange={handleSearch} />
    </div>
  );
};

export default Search;
