const initialState = {
  start: false,
  success: false,
  categories: [],
  fail: false,
  errorMessage: "",
};

const categoriesReducer = (state = initialState, action) => {
  if (action.type === "FETCH_CATEGORIES_START") {
    return {
      ...state,
      start: true,
    };
  }
  if (action.type === "FETCH_CATEGORIES_SUCCESS") {
    return {
      ...state,
      start: false,
      success: true,
      categories: action.payload,
    };
  }
  if (action.type === "FETCH_CATEGORIES_FAIL") {
    return {
      ...state,
      start: false,
      fail: true,
      errorMessage: action.payload,
    };
  }
  return state;
  // switch (action.type) {
  //   case "FETCH_CATEGORIES_START":
  //     return {
  //       ...state,
  //       start: true,
  //     };
  //   case "FETCH_CATEGORIES_SUCCESS":
  //     return {
  //       ...state,
  //       start: false,
  //       success: true,
  //       categories: action.payload,
  //     };
  //   case "FETCH_CATEGORIES_FAIL":
  //     return {
  //       ...state,
  //       start: false,
  //       fail: true,
  //       errorMessage: action.payload,
  //     };
  //   default:
  //     return state;
  // }
};

export default categoriesReducer;
