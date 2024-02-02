/* eslint-disable react/prop-types */
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, imgUrl }) => {

  const tags = book.genre;
  const navigate = useNavigate();
  const handleCardClick = () => {
    // Przekieruj do odpowiedniego endpointu z id książki
    navigate(`/book/${book.id ? book.id : book._id}`);
  };

  return (
    <div className="max-w-72 rounded overflow-hidden shadow-lg my-7 bg-slate-100 hover:bg-slate-300 hover:border-sky-500 border-2" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img src={imgUrl} alt="" className="w-full"/>
      <div className="px-6 py-4 ">
        <div className="text-emerald-700 font-bold text-xl mb-2">
          {book.title ? book.title : book._id}
        </div>
        <ul>
          <li>
            <strong>Author: </strong>
            {book.author}
          </li>
          <li>
            <strong>Score: </strong>
            {typeof book.score === 'number' ? book.score.toFixed(2) : _.mean(book.score).toFixed(2)}
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        {tags.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #{tag}
        </span>
        ))}
      </div>
    </div>
  )
}

export default BookCard;