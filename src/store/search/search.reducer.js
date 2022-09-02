import { SEARCH_ACTION_TYPES } from "./search.types";

//initial state for search box, box is hidden
export const SEARCH_INITIAL_STATE = {
  isSearchOpen: false
};

export const searchReducer = (state = SEARCH_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_ACTION_TYPES.SET_IS_SEARCH_OPEN:
      return {
        ...state,
        isSearchOpen: payload,
      };
    default:
      return state;
  }
};