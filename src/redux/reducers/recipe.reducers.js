import * as types from "../constants/recipe.constants";
import * as commentTypes from "../constants/comment.constants";
import * as reactionTypes from "../constants/reaction.constants";

const initialState = {
  recipes: [],
  totalPageNum: 1,
  currentPage: 1,
  selectedRecipe: null,
  subLoading: false,
  loading: false,
};

const recipeReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    /**
     * Create a New Recipe
     */
    case types.CREATE_RECIPE_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.CREATE_RECIPE_FAILURE:
      return { ...state, loading: false };

    /**
     * Get Recipes
     */
    case types.GET_RECIPES_REQUEST:
      return { ...state, loading: true };
    case types.GET_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: payload.recipes,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_RECIPES_FAILURE:
      return { ...state, loading: false };

    /**
     * Get a Single Recipe
     */
    case types.GET_SINGLE_RECIPE_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_RECIPE_SUCCESS:
      return { ...state, selectedRecipe: payload, loading: false };
    case types.GET_SINGLE_RECIPE_FAILURE:
      return { ...state, loading: false };

    /**
     * Create New Comment of a Recipe
     */
    case commentTypes.CREATE_COMMENT_REQUEST:
      return { ...state, subLoading: true };
    case commentTypes.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          comments: [...state.selectedRecipe.comments, payload],
        },
        subLoading: false,
      };
    case commentTypes.CREATE_COMMENT_FAILURE:
      return { ...state, subLoading: false };

    /**
     * Send Reaction to Recipe or Comment
     */
    case reactionTypes.SEND_REACTION_REQUEST:
      return { ...state, subLoading: true };
    case reactionTypes.RECIPE_REACTION_SUCCESS:
      return {
        ...state,
        selectedRecipe: { ...state.selectedRecipe, reactions: payload },
        subLoading: false,
      };
    case reactionTypes.COMMENT_REACTION_SUCCESS:
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          comments: [
            ...state.selectedRecipe.comments.map((comment) => {
              if (comment._id !== payload.commentId) {
                return comment;
              }
              return { ...comment, reactions: payload.reactions };
            }),
          ],
        },
        subLoading: false,
      };
    case reactionTypes.SEND_REACTION_FAILURE:
      return { ...state, subLoading: false };

    /**
     * Update a Recipe
     */
    case types.UPDATE_RECIPE_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        selectedRecipe: payload,
        loading: false,
      };
    case types.UPDATE_RECIPE_FAILURE:
      return { ...state, loading: false };

    /**
     * Delete a Recipe
     */
    case types.DELETE_RECIPE_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        selectedRecipe: {},
        loading: false,
      };
    case types.DELETE_RECIPE_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default recipeReducers;
