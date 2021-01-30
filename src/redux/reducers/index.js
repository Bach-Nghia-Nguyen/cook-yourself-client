import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import recipeReducer from "./recipe.reducer";
import routeReducer from "./route.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  auth: authReducer,
  recipe: recipeReducer,
  route: routeReducer,
  user: userReducer,
});
