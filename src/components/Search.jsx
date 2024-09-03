import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Handle input change and call the parent onSearch handler
  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Pass the new query to the parent component
  };

  return (
    <input
      type="search"
      placeholder="Search Song, Artist"
      value={query}
      onChange={handleChange}
      className="h-10 pl-2 w-40 md:w-80 rounded-lg bg-gray-200/[0.6] focus:outline-none focus:border-gray-200 text-white"
    />
  );
};

export default Search;
