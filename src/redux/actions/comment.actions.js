import * as commentTypes from "../constants/comment.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const createNewComment = (recipeId, commentText) => async (dispatch) => {
  dispatch({ type: commentTypes.CREATE_COMMENT_REQUEST, payload: null });

  try {
    const res = await api.post(`/comments/recipes/${recipeId}`, {
      content: commentText,
    });
    dispatch({
      type: commentTypes.CREATE_COMMENT_SUCCESS,
      payload: res.data.data,
    });
    toast.success("New comment created!");
  } catch (error) {
    dispatch({ type: commentTypes.CREATE_COMMENT_FAILURE, payload: error });
  }
};

const editComment = (commentId, commentText) => async (dispatch) => {
  dispatch({ type: commentTypes.UPDATE_COMMENT_REQUEST, payload: null });

  try {
    const res = await api.put(`/comments/${commentId}`, {
      content: commentText,
    });
    dispatch({
      type: commentTypes.UPDATE_COMMENT_SUCCESS,
      payload: res.data.data,
    });
    toast.success("Comment updated!");
  } catch (error) {
    dispatch({ type: commentTypes.UPDATE_COMMENT_FAILURE, payload: error });
  }
};

const deleteComment = (commentId) => async (dispatch) => {
  dispatch({ type: commentTypes.DELETE_COMMENT_REQUEST, payload: null });

  try {
    const res = await api.delete(`/comments/${commentId}`);
    dispatch({ type: commentTypes.DELETE_COMMENT_SUCCESS, payload: res.data });
    toast.success("Comment deleted!");
  } catch (error) {
    dispatch({ type: commentTypes.DELETE_COMMENT_FAILURE, payload: error });
  }
};

export const commentActions = { createNewComment, editComment, deleteComment };
