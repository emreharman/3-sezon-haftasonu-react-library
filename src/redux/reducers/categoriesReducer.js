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
  if (action.type === "ADD_CATEGORY") {
    return {
      ...state,
      categories: [...state.categories, action.payload],
    };
  }
  if (action.type === "DELETE_CATEGORY") {
    const filteredCategories = state.categories.filter(
      (item) => item.id !== action.payload
    );
    return {
      ...state,
      categories: filteredCategories,
    };
  }
  if (action.type === "EDIT_CATEGORY") {
    const filteredCategories = state.categories.filter(
      (item) => item.id != action.payload.id
    );
    return {
      ...state,
      categories: [...filteredCategories, action.payload],
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
