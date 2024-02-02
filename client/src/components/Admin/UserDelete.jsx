import React, { useEffect, useState } from "react";

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:7000/allusers");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:7000/user/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`Successfully deleted user with userId: ${userId}`);
        // Pobierz zaktualizowanych użytkowników i zaktualizuj stan
        const updatedUsers = await fetch("http://localhost:7000/allusers").then((res) =>
          res.json()
        );
        setUsers(updatedUsers);
      } else {
        console.error(`Failed to delete user with userId: ${userId}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="w-3/5 content-center mx-auto">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <h3 className="text-center text-slate-800 font-serif text-3xl font-extrabold my-10">
              Users
            </h3>
            {users.length > 0 ? (
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-teal-300 font-medium dark:border-neutral-500 ">
                  <tr className="border-b bg-blue-200 dark:border-neutral-500">
                    <th scope="col" className="px-6 py-4">
                      User ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      className="border-b bg-neutral-100 dark:border-neutral-500 hover:bg-opacity-40 cursor-pointer"
                      key={user._id}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {user._id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        <button
                          className="border-b bg-neutral-100 dark:border-neutral-500 hover:bg-opacity-40 cursor-pointer"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;