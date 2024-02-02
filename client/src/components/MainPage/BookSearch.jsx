import React, { useState } from 'react';

const BookSearch = ({ searchText, sortBooks }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  }

  return (
    <div className='max-w-sm rounded overflow-hidden my-10 mx-auto'>
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b
         border-teal-500 py-2">
        <input onChange={e => setText(e.target.value)} 
        className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search Book..." />
        <button className="hover:bg-blue-500 hover:border-indigo-500 text-violet-300 font-bold py-2 px-4 border border-blue-700 rounded" type="submit">
          Search
        </button>
        </div>
      </form>
    </div>
  );
}

export default BookSearch;
