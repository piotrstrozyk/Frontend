import React, { useState, useEffect } from 'react';

const SearchDropdown = ({ onSearchChange }) => {
  const [selectedCondition, setSelectedCondition] = useState('title');

  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
  };

  useEffect(() => {
    // Przekazuje warunek wyszukiwania do komponentu nadrzędnego
    onSearchChange(selectedCondition);
  }, [selectedCondition, onSearchChange]);

  return (
    <div>
      <label htmlFor="searchCondition" className="text-gray-700">Search by: </label>
      <select id="searchCondition" value={selectedCondition} onChange={handleConditionChange} 
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="genre">Genre</option>
      </select>
    </div>
  );
};

export default SearchDropdown;