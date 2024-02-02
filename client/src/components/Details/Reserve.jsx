import React, { useState, useLayoutEffect } from 'react';

const ReservationDropdown = ({ bookId, title }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [isReserved, setIsReserved] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReserve = async () => {
    try {
      await fetch(`http://localhost:7000/book/reservations/${bookId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate, title: title }),
      });

      console.log(`Reserving book ${bookId} for date ${selectedDate}`);
      setIsReserved(true);
    } catch (error) {
      console.error('Error reserving book:', error);
    }
  };

  useLayoutEffect(() => {
    const currentDate = new Date();
    const dates = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + index);
      return date.toISOString().split('T')[0];
    });
    setAvailableDates(dates);
    setSelectedDate(dates[0]);
    setIsReserved(false);
  }, []);

  return (
    <div className="reservation-dropdown">
      {isReserved ? (
        <p className='bg-emerald-200 text-sky-400 font-bold'>Book reserved for {selectedDate}</p>
      ) : (
        <>
          <select onChange={(e) => handleDateChange(e.target.value)}>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          <button className="text-white bg-green-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleReserve} disabled={!selectedDate}>
            Reserve
          </button>
        </>
      )}
    </div>
  );
};

export default ReservationDropdown;