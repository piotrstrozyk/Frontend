// reducers.js
export const booksReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BOOKS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export const loadingReducer = (state = true, action) => {
    switch (action.type) {
      case 'SET_LOADING':
        return action.payload;
      default:
        return state;
    }
  };
  