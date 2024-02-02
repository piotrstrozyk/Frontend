import React, { useState, useLayoutEffect, useReducer } from "react";
import Cookies from 'js-cookie';
import "./Stars.scss";

const initialState = {
  rating: 0,
  temporaryRating: 0,
  isRatingSubmitted: false,
  tooEarly: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setRating':
      return { ...state, rating: action.payload };
    case 'setTemporaryRating':
      return { ...state, temporaryRating: action.payload };
    case 'setIsRatingSubmitted':
      return { ...state, isRatingSubmitted: action.payload };
    case 'setTooEarly':
      return { ...state, tooEarly: action.payload };
    default:
      return state;
  }
};

const Stars = ({ id }) => {
  const userId = Cookies.get('user');
  const [state, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    if (state.isRatingSubmitted) {
      console.log("Rating submitted successfully!");
      // Tutaj możesz wprowadzić zmiany w układzie DOM na podstawie zmian w widoku.
    }
  }, [state.isRatingSubmitted]);

  let stars = Array(5).fill("★");

  const submitRating = async (rating, userId) => {
    try {
      const response = await fetch(`http://localhost:7000/book/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: rating,
          userId: userId,
        }),
      });

      if (response.ok) {
        dispatch({ type: 'setIsRatingSubmitted', payload: true });
      } else {
        dispatch({ type: 'setTooEarly', payload: true });
        console.log("Failed to submit rating");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleClick = (rating, userId) => {
    dispatch({ type: 'setRating', payload: rating });
    submitRating(rating, userId);
  };

  return (
    <div className="starsContainer">
      {stars.map((item, index) => {
        const isActiveColor =
          (state.rating || state.temporaryRating) &&
          (index < state.rating || index < state.temporaryRating);

        let elementColor = "";

        if (isActiveColor) {
          elementColor = "yellow";
        } else {
          elementColor = "grey";
        }

        return (
          <div
            className="star"
            key={index}
            style={{
              fontSize: "30px",
              color: elementColor,
              filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
            }}
            onMouseEnter={() => dispatch({ type: 'setTemporaryRating', payload: index + 1 })}
            onMouseLeave={() => dispatch({ type: 'setTemporaryRating', payload: 0 })}
            onClick={() => handleClick(index + 1, userId)}
          >
            {"★"}
          </div>
        );
      })} {state.tooEarly && state.isRatingSubmitted && <p className="mb-1 text-lg text-slate-700">You need to wait before your next review!</p>}
      {state.isRatingSubmitted && !state.tooEarly && <p className="mb-1 text-lg text-slate-700">Rating submitted!</p>}
    </div>
  );
}

export default Stars;