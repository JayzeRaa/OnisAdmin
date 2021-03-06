import * as types from "../../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  data: [],
  isLoading: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SHOP_UPDATE_LIST_ALL: 
        return { ...state, error: "", message: "", data: action.payload, isLoading: false };
    case types.SHOP_UPDATE_LIST_ERROR:
        return { ...state, error: action.payload, message: "", data: [], isLoading: false };
    case types.SHOP_UPDATE_LIST_FETCH:
        return { ...state, error: "", message: "", isLoading: true }
    default:
      return state;
  }
}
