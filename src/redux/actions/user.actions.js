import * as types from "../constants/user.constants";
import api from "../../apiService";

const getUsers =
  (pageNum = 1, limit = 10, query = null, sortBy = null) =>
  async (dispatch) => {
    dispatch({ type: types.GET_USERS_REQUEST, payload: null });
    try {
      let queryString = "";
      if (query) {
        queryString = `&name[$regex]=${query}&name[$options]=i`;
      }
      let sortByString = "";
      if (sortBy?.key) {
        sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
      }
      const res = await api.get(
        `/users?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
      );

      dispatch({
        type: types.GET_USERS_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({ type: types.GET_USERS_FAILURE, payload: error });
    }
  };

export const userActions = { getUsers };
