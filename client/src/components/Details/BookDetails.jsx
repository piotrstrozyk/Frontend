import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Stars from './Stars.jsx'
import _ from 'lodash';
import Comments from './Comments.jsx';
import ReserveDropdown from './Reserve.jsx';


const BookDetails = () => {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState({});
    const [reser, setReser] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:7000/book/${id}`)
          .then(res => res.json())
          .then(data => {
            setBookDetails(data[0]);
          })
          .catch(err => console.log(err));
      }, [id]);

      useEffect(() => {
        fetch(`http://localhost:7000/allreservations`)
          .then(res => res.json())
          .then(data => {
            data.map((item) => {
              if(item.bookId === id && item.status === 'reserved' ||item.bookId === id &&  item.status === 'borrowed' ||item.bookId === id && item.status === 'confirmed'){
                setReser(true)
              }
            })
          })
          .catch(err => console.log(err));
      }, [id]);
    

      return (
        <>
        <div className="flex bg-zinc-300 mx-10 rounded-xl">
          {bookDetails ? (
            <>
              <img src={bookDetails.cover} alt={bookDetails.title} className="w-full mr-4 object-cover" />
              <div className="max-h-lvh p-4">
                <h2 className="text-2xl font-bold mb-2">{bookDetails.title}</h2>
                <p className="text-gray-500 max-h-40 mb-2  w-4/5 overflow-y-auto flex-1">{bookDetails.description}</p>
                <section className='flex'>
                <div className='flex-1'>
                  <p className="mb-1 text-lg text-slate-700">
                    <strong>Author:</strong> {bookDetails.author}
                  </p>
                  {bookDetails.genre && (
                <p className="mb-1 text-lg text-slate-700">
                  <strong>Genre:</strong> {bookDetails.genre.join(', ')}
                </p>
              )}
                  <p className="mb-1 text-lg text-slate-700">
                    <strong>Date: </strong> {new Date(bookDetails.date).toLocaleDateString()}
                  </p>
                  <p className="mb-1 text-lg text-slate-700">
                    <strong>Publisher:</strong> {bookDetails.publisher}
                  </p>
                  <p className="mb-1 text-lg text-slate-700">
                    <strong>Publishing Year:</strong> {bookDetails.publishingYear}
                  </p>
                  <p className="mb-1 text-lg text-slate-700">
                    <strong>Score:</strong> {bookDetails.score ? _.mean(bookDetails.score).toFixed(2) : 'No score yet'}
                    </p> 
                    <div>from {_.size(bookDetails.score)} reviews </div> 
                  
                </div>
                <div className='flex-1 my-5'>
                  {reser ? (
                    <p className=' text-red-800 font-bold rounded-xl py-3 w-20 content-center text-2xl'>Reserved</p>
                  ) : (
                    <ReserveDropdown bookId={id} title={bookDetails.title} />
                  )}
                </div>
                </section>
                <Stars id={id}/>
              </div>
             
              
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div> 
        <Comments bookTitle={bookDetails.title} />
        </>
      );
    };
    
    export default BookDetails;