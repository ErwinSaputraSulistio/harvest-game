import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const intialState = {
  isDataFetched: false,
  isLoggedIn: false,
  test:"ini test string dpt dari store"
};

function reducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_LOGIN":
      return { ...state, isLoggedIn: payload };
    // case "SET_DOCUMENTS":
    //   return { ...state, documents: payload };
    // case "SET_IS_DATA_FETCHED":
    //   return { ...state, isDataFetched: payload };
    // case "SET_CURRENT_PAGE":
    //   return { ...state, currentPage: payload };
    // case "SET_KEYWORD":
    //   return { ...state, searchKeyword: payload };

    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;