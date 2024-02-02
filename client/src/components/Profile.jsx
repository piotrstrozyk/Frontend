import React, { useEffect, useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";

function Profile() {
  const [reservations, setReservations] = useState([]);
  const userId = Cookies.get("user");

  useLayoutEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:7000/allreservations");
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          console.error("Failed to fetch reservations");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleRowClick = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:7000/book/reservations/confirm/${bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          }}
      );

      if (response.ok) {
        console.log(`Success! ${bookId}`);
        // Pobierz zaktualizowane rezerwacje i zaktualizuj stan
        const updatedReservations = await fetch("http://localhost:7000/allreservations").then(res => res.json());
        setReservations(updatedReservations);
      } else {
        console.error(`Failed to confirm reservation with bookId: ${bookId}`);
      }
    } catch (error) {
      console.error("Error confirming reservation:", error);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:7000/book/reservations/borrow/${bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          }}
      );

      if (response.ok) {
        console.log(`Successfully borrowed book with bookId: ${bookId}`);
        // Pobierz zaktualizowane rezerwacje i zaktualizuj stan
        const updatedReservations = await fetch("http://localhost:7000/allreservations").then(res => res.json());
        setReservations(updatedReservations);
      } else {
        console.error(`Failed to borrow book with bookId: ${bookId}`);
      }
    } catch (error) {
      console.error("Error borrowing:", error);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:7000/book/reservations/return/${bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          }}
      );

      if (response.ok) {
        console.log(`Successfully returned book with bookId: ${bookId}`);
        // Pobierz zaktualizowane rezerwacje i zaktualizuj stan
        const updatedReservations = await fetch("http://localhost:7000/allreservations").then(res => res.json());
        setReservations(updatedReservations);
      } else {
        console.error(`Failed to return book with bookId: ${bookId}`);
      }
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  const userReservations = reservations.filter(
    (reservation) => reservation.userId === userId
  );

  return (
    <div className="w-3/5 content-center mx-auto">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <h3 className="text-center text-slate-800 font-serif text-3xl font-extrabold my-10">
              Your Reservations
            </h3>
            {userReservations.length > 0 ? (
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-teal-300 font-medium dark:border-neutral-500 ">
                  <tr className="border-b bg-blue-200 dark:border-neutral-500">
                    <th scope="col" className="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      BookId
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userReservations.map((reservation) => (
                    <tr
                      className={`border-b bg-neutral-100 dark:border-neutral-500 hover:bg-opacity-40 cursor-pointer ${reservation.status === 'returned' ? 'pointer-events-none' : ''}`}
                      key={reservation._id}
                      onClick={() => handleRowClick(reservation._id)}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {reservation.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {reservation.reserveDate}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {reservation.status}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {reservation.bookId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {reservation.status === 'confirmed' && (
                          <button className="border-b bg-neutral-100 dark:border-neutral-500 hover:bg-opacity-40 cursor-pointer" onClick={() => handleBorrow(reservation._id)}>
                            Borrow
                          </button>
                        )}
                        {reservation.status === 'borrowed' && (
                          <button className="border-b bg-neutral-100 dark:border-neutral-500 hover:bg-opacity-40 cursor-pointer" onClick={() => handleReturn(reservation._id)}>
                            Return
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No reservations found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
