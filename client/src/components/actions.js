// actions.js
export const setBooks = (books) => ({
    type: 'SET_BOOKS',
    payload: books,
  });
  
  export const setLoading = (isLoading) => ({
    type: 'SET_LOADING',
    payload: isLoading,
  });
  