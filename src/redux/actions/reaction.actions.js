import * as reactionTypes from "../constants/reaction.constants";
import api from "../../apiService";

const sendReaction = (targetType, targetId, emoji) => async (dispatch) => {
  dispatch({ type: reactionTypes.SEND_REACTION_REQUEST, payload: null });

  try {
    const res = await api.post(`/reactions`, { targetType, targetId, emoji });
    if (targetType === "Recipe") {
      dispatch({
        type: reactionTypes.RECIPE_REACTION_SUCCESS,
        payload: res.data.data,
      });
    }
    if (targetType === "Comment") {
      dispatch({
        type: reactionTypes.COMMENT_REACTION_SUCCESS,
        payload: { reactions: res.data.data, commentId: targetId },
      });
    }
  } catch (error) {
    dispatch({ type: reactionTypes.SEND_REACTION_FAILURE, payload: error });
  }
};

export const reactionActions = { sendReaction };
