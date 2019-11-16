import { FETCH_STOCKITEMS } from "../actions/types";

export default (state = "loading", action) => {
  switch (action.type) {
    case FETCH_STOCKITEMS:
      return action.payload;
    default:
      return state;
  }
};
