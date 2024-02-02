import React, { useState } from 'react';

const SearchDropdown = ({ onSearchChange, sortBooks }) => {
  const [selectedOption, setSelectedOption] = useState('title');

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue === 'asc' || selectedValue === 'desc') {
      sortBooks(selectedValue);
    } else {
      onSearchChange(selectedValue);
    }
  };

  return (
    <div className="relative">
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      >
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="year">Sort by Year</option>
        <option value="asc">Sort Ascending</option>
        <option value="desc">Sort Descending</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchDropdown;