import * as types from "../constants/recipe.constants";
import api from "../../apiService";
import { routeActions } from "./route.actions";
import { toast } from "react-toastify";

const recipesRequest = (
  pageNum = 1,
  limit = 10,
  query = null,
  ownerId = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.RECIPE_REQUEST, payload: null });
  try {
    let queryString = "";
    if (query) {
      queryString = `&name[$regex]=${query}&name[$options]=i`;
    }
    if (ownerId) {
      queryString = `${queryString}&author=${ownerId}`;
    }
    let sortByString = "";
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }

    const res = await api.get(
      `/recipes?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
    );

    dispatch({
      type: types.RECIPE_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.RECIPE_REQUEST_FAILURE, payload: error });
  }
};

const getSingleRecipe = (recipeId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_RECIPE_REQUEST, payload: null });
  try {
    const res = await api.get(`/recipes/${recipeId}`);
    dispatch({
      type: types.GET_SINGLE_RECIPE_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_RECIPE_REQUEST_FAILURE, payload: error });
  }
};

const createNewRecipe = (name, description, images) => async (dispatch) => {
  dispatch({ type: types.CREATE_RECIPE_REQUEST, payload: null });
  try {
    const res = await api.post("/recipes", { name, description, images });

    dispatch({
      type: types.CREATE_RECIPE_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("New recipe has been created!");
  } catch (error) {
    dispatch({ type: types.CREATE_RECIPE_FAILURE, payload: error });
  }
};

const updateRecipe = (recipeId, name, description, images) => async (
  dispatch
) => {
  dispatch({ type: types.UPDATE_RECIPE_REQUEST, payload: null });
  try {
    const res = await api.put(`/recipes/${recipeId}`, {
      name,
      description,
      images,
    });

    dispatch({
      type: types.UPDATE_RECIPE_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("The recipe has been updated!");
  } catch (error) {
    dispatch({ type: types.UPDATE_RECIPE_FAILURE, payload: error });
  }
};

const deleteRecipe = (recipeId) => async (dispatch) => {
  dispatch({ type: types.DELETE_RECIPE_REQUEST, payload: null });
  try {
    const res = await api.delete(`/recipes/${recipeId}`);
    console.log(res);
    dispatch({ type: types.DELETE_RECIPE_SUCCESS, payload: res.data });
    dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("The recipe has been deleted!");
  } catch (error) {
    dispatch({ type: types.DELETE_RECIPE_FAILURE, payload: error });
  }
};

export const recipeActions = {
  recipesRequest,
  getSingleRecipe,
  createNewRecipe,
  updateRecipe,
  deleteRecipe,
};
