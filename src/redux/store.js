import categoriesReducer from "./reducers/categoriesReducer";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  categoriesState: categoriesReducer,
});

const store = createStore(rootReducer);

export default store;
