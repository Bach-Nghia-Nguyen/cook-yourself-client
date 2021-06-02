import * as types from "../constants/auth.constants";
const isAuthenticated = !!localStorage.getItem("accessToken");
const initialState = {
  user: {},
  isAuthenticated,
  accessToken: localStorage.getItem("accessToken"),
  loading: false,
  isPasswordRight: false,
  subLoading: false,
};

const authReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    /**
     * Register new user
     */
    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return { ...state, loading: false };
    case types.REGISTER_FAILURE:
      return { ...state, loading: false };

    /**
     * Log In
     */
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    /**
     * Get current user (persist login when refresh)
     */
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    /**
     * Update user profile
     */
    case types.UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, payload },
        isPasswordRight: false,
      };
    case types.UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false };

    /**
     * Validate current password
     */
    case types.VALIDATE_CURRENT_PASSWORD_REQUEST:
      return { ...state, subLoading: true, isPasswordRight: false };
    case types.VALIDATE_CURRENT_PASSWORD_SUCCESS:
      return {
        ...state,
        isPasswordRight: true,
        subLoading: false,
      };
    case types.VALIDATE_CURRENT_PASSWORD_FAILURE:
      return { ...state, subLoading: false, isPasswordRight: false };

    /**
     * Log Out
     */
    case types.LOGOUT:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducers;
