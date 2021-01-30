import * as types from "../constants/user.constants";

const initialState = {
  users: [],
  totalPageNum: 1,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // request
    case types.GET_USERS_REQUEST:
      return { ...state, loading: true };

    // success
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users,
        totalPageNum: payload.totalPages,
        loading: false,
      };

    // failure
    case types.GET_USERS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducer;
