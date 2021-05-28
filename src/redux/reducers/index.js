import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import recipeReducers from "./recipe.reducers";
import routeReducers from "./route.reducers";
import userReducers from "./user.reducers";

export default combineReducers({
  auth: authReducers,
  recipe: recipeReducers,
  route: routeReducers,
  user: userReducers,
});
