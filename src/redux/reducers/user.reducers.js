import * as types from "../constants/user.constants";

const initialState = {
  users: [],
  totalPageNum: 1,
  loading: false,
};

const userReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    /**
     * Get Users
     */
    case types.GET_USERS_REQUEST:
      return { ...state, loading: true };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_USERS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducers;
