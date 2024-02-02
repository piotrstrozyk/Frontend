import React, { useEffect, useState } from 'react';

const Stats = () => {
  const [bestBook, setBestBook] = useState({});
  const [oldestBook, setOldestBook] = useState({});
  const [genrePopular, setGenrePopular] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for bestBook
        const bestBookResponse = await fetch('http://localhost:7000/main/bestBook');
        const bestBookData = await bestBookResponse.json();
        setBestBook(bestBookData[0]);

        // Fetch data for oldestBook
        const oldestBookResponse = await fetch('http://localhost:7000/main/oldestBook');
        const oldestBookData = await oldestBookResponse.json();
        setOldestBook(oldestBookData[0]);

        // Fetch data for genrePopular
        const genrePopularResponse = await fetch('http://localhost:7000/main/genrePopular');
        const genrePopularData = await genrePopularResponse.json();
        setGenrePopular(genrePopularData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-8">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Best Book */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Best Review Book</h3>
          <img
            src={bestBook.cover}
            alt={bestBook.title}
            className="mb-4 rounded-lg"
          />
          <p className="font-bold">{bestBook.title}</p>
          <p className="text-gray-500">Score: {bestBook.score}</p>
        </div>

        {/* Oldest Book */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Oldest Book</h3>
          <img
            src={oldestBook.cover}
            alt={oldestBook.title}
            className="mb-4 rounded-lg"
          />
          <p className="font-bold">{oldestBook.title}</p>
          <p className="text-gray-500">Author: {oldestBook.author}</p>
          <p className="text-gray-500">Date: {oldestBook.date}</p>
        </div>

        {/* Most Popular Genre */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Most Popular Genre</h3>
          <img
            src={genrePopular.covers}
            className="mb-4 rounded-lg"
          />
          <p className="font-bold">{genrePopular.genre}</p>
          <p className="text-gray-500">Books: {genrePopular.books}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
