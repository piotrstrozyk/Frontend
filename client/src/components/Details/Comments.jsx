import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

const Comments = ({ bookTitle }) => {
  const [comments, setComments] = useState([]);
  const userId = Cookies.get('user');

  useEffect(() => {
    fetch(`http://localhost:7000/book/comments/${bookTitle}`)
    .then(res => res.json())
    .then(data => {
      setComments(data);
      console.log(data)
    })
    .catch(err => console.log(err));
  }, [bookTitle]);

  const formik = useFormik({
    initialValues: {
      newComment: '',
    },
    onSubmit: async (values, actions) => {
      if (!values.newComment.trim()) {
        console.error('Comment cannot be empty');
        return;
      }
      try {
        const response = await fetch(`http://localhost:7000/book/comments/${bookTitle}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: values.newComment }),
      });
      if (response.ok && userId) {
        setComments([...comments, {user: userId, content: values.newComment}]);
        actions.resetForm();
      } else {
        setComments([...comments, {user: "Anonymous", content: values.newComment}])
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  },
});

  return (
    <section className="bg-indigo-100 py-8 lg:py-16 mt-10 antialiased">
    <div className="max-w-2xl mx-auto px-4">
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Comments ({comments.length})</h2>
    </div>      
    <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <textarea
              id="newComment"
              name="newComment"
              value={formik.values.newComment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-slate-600 placeholder-gray-400 bg-slate-50"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              style={{ backgroundColor: '#6B7280' }}
              className="my-5 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4  focus:ring-primary-900"
            >
          Add Comment
        </button>
      </div>
      </form>
    {comments.length > 0 ? (
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="p-6 text-base rounded-lg bg-stone-200 border-b border-slate-600">
            <p className="font-bold text-slate-500">{comment.user}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      ) : (
        <p>No comments yet.</p>
      )}

    </div>
    </section>
  );
};

export default Comments;