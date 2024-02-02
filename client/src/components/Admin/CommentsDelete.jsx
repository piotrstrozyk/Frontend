import React, { useEffect, useState } from "react";

function CommentsTable() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:7000/admin/allcomments");
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:7000/admin/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`Successfully deleted comment with commentId: ${commentId}`);
        // Pobierz zaktualizowane komentarze i zaktualizuj stan
        const updatedComments = await fetch("http://localhost:7000/admin/allcomments").then((res) =>
          res.json()
        );
        setComments(updatedComments);
      } else {
        console.error(`Failed to delete comment with commentId: ${commentId}`);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="w-3/5 content-center mx-auto">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <h3 className="text-center text-slate-800 font-serif text-3xl font-extrabold my-10">
              Comments
            </h3>
            {comments.length > 0 ? (
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-teal-300 font-medium dark:border-neutral-500 ">
                  <tr className="border-b bg-blue-200 dark:border-neutral-500">
                    <th scope="col" className="px-6 py-4">
                      Comment ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      User
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Content
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((comment) => (
                    <tr
                      className="border-b bg-neutral-100 dark:border-neutral-500 hover:bg-opacity-40 cursor-pointer"
                      key={comment._id}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {comment._id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {comment.user}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {comment.content}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {comment.book}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        <button
                          className="border-b bg-neutral-100 dark:border-neutral-500 hover:bg-opacity-40"
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No comments found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsTable;
