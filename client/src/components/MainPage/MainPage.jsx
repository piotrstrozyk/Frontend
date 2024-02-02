
import React, { useEffect, useState } from "react";
import '../../assets/tailwind.css';
import BookCard from "./BookCard";
import BookSearch from "./BookSearch";
import SearchDropdown from "./SearchMenu";

function MainPage() {

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [condition, setCondition] = useState('title');
  const [sortCriteria, setSortCriteria] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSearchChange = (condition) => {
    setCondition(condition);
  };

  const sortBooks = (criteria) => {
    const newDirection = criteria === sortCriteria && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortCriteria(criteria);
    setSortDirection(newDirection);

    const sortedBooks = [...books].sort((a, b) => {
      if (newDirection === 'asc') {
        return a[criteria].localeCompare(b[criteria]);
      } else {
        return b[criteria].localeCompare(a[criteria]);
      }
    });

    setBooks(sortedBooks);
  };

  useEffect(() => {
    const endpoint = term ? `http://localhost:7000/search/${condition}/${term}` : 'http://localhost:7000/main';

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <div className="flex space-x-0 mb-4">
        <BookSearch searchText={(text) => setTerm(text)} sortBooks={sortBooks} />
        <SearchDropdown onSearchChange={handleSearchChange} sortBooks={sortBooks} />
      </div>
      {!isLoading && books.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Books Found</h1> }

      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
        {books.map(book => (
          <BookCard key={book._id} book={book} imgUrl={book.cover}/>
        ))}
      </div>}
    </div>
  );
}

export default MainPage;
