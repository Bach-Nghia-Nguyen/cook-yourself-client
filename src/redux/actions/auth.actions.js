import * as types from "../constants/auth.constants";
import api from "../../apiService";
import { routeActions } from "./route.actions";
import { toast } from "react-toastify";

const register =
  ({ name, email, password, avatarUrl }) =>
  async (dispatch) => {
    dispatch({ type: types.REGISTER_REQUEST, payload: null });

    try {
      const res = await api.post("/users", {
        name,
        email,
        password,
        avatarUrl,
      });
      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
      dispatch(routeActions.redirect("/login"));
      toast.success(`Thank you for your registration, ${name}!`);
    } catch (error) {
      dispatch({ type: types.REGISTER_FAILURE, payload: error });
    }
  };

const verifyEmail = (code) => async (dispatch) => {
  dispatch({ type: types.VERIFY_EMAIL_REQUEST, payload: null });

  try {
    const res = await api.post("/users/verify_email", { code });
    dispatch({ type: types.VERIFY_EMAIL_SUCCESS, payload: res.data.data });
    const name = res.data.data.user.name;
    toast.success(`Welcome, ${name}! Your email address has been veirfied.`);
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
  } catch (error) {
    dispatch({ type: types.VERIFY_EMAIL_FAILURE, payload: error });
  }
};

const login = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });

  try {
    const res = await api.post("/auth/login", { email, password });
    const name = res.data.data.user.name;
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });

    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;

    toast.success(`Welcome back, ${name}`);
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
    toast.error("Incorrect email or password!");
  }
};

const loginFacebook = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_FACEBOOK_REQUEST, payload: null });

  try {
    const res = await api.post("/auth/login/facebook", { access_token });
    const name = res.data.data.user.name;
    toast.success(`Welcome ${name}`);
    dispatch({ type: types.LOGIN_FACEBOOK_SUCCESS, payload: res.data.data });
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
  } catch (error) {
    dispatch({ type: types.LOGIN_FACEBOOK_FAILURE, payload: error });
  }
};

const loginGoogle = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_GOOGLE_REQUEST, payload: null });

  try {
    const res = await api.post("/auth/login/google", { access_token });
    const name = res.data.data.user.name;
    toast.success(`Welcome ${name}`);
    dispatch({ type: types.LOGIN_GOOGLE_SUCCESS, payload: res.data.data });
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
  } catch (error) {
    dispatch({ type: types.LOGIN_GOOGLE_FAILURE, payload: error });
  }
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    api.defaults.headers.common["authorization"] = accessToken;
  }
  try {
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const updateProfile =
  ({ name, avatarUrl, password }) =>
  async (dispatch) => {
    dispatch({ type: types.UPDATE_PROFILE_REQUEST, payload: null });

    try {
      const res = await api.put("/users", { name, avatarUrl, password });
      dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: res.data.data });
      toast.success(`Your profile has been updated.`);
    } catch (error) {
      dispatch({ type: types.UPDATE_PROFILE_FAILURE, payload: error });
    }
  };

const validateCurrentPassword = (password) => async (dispatch) => {
  dispatch({ type: types.VALIDATE_CURRENT_PASSWORD_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/validate_password", { password });
    console.log("validate result:", res);
    dispatch({
      type: types.VALIDATE_CURRENT_PASSWORD_SUCCESS,
      payload: res.data.data,
    });
    toast.success("The password is right!!!");
  } catch (error) {
    dispatch({ type: types.VALIDATE_CURRENT_PASSWORD_FAILURE, payload: error });
    toast.error("Wrong password! Try again");
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
};

export const authActions = {
  login,
  loginFacebook,
  loginGoogle,
  register,
  verifyEmail,
  updateProfile,
  getCurrentUser,
  validateCurrentPassword,
  logout,
};
