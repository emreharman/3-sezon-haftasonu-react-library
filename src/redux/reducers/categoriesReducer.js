const initialState = {
  start: false,
  success: false,
  categories: [],
  fail: false,
  errorMessage: "",
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_START":
      return {
        ...state,
        start: true,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
