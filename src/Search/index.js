import React, { useState } from 'react';

const Search = ({ value, onSearch }) => {
  return (
    <div className="search-box">
      <input className="input-search" placeholder="Search Events.." type="text" value={value} onChange={(event) => onSearch(event)}/>
    </div>
  )
}

export default Search;