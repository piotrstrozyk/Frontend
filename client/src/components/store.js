// store.js
import { createStore, combineReducers } from 'redux';
import { booksReducer, loadingReducer } from './reducers';

const rootReducer = combineReducers({
  books: booksReducer,
  isLoading: loadingReducer,
});

const store = createStore(rootReducer);

export default store;
