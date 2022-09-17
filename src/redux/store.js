import categoriesReducer from "./reducers/categoriesReducer";
import booksReducer from "./reducers/booksReducer";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  categoriesState: categoriesReducer,
  booksState: booksReducer,
});

const store = createStore(rootReducer);

export default store;
