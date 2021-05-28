import React from "react";

// import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import AlertMessage from "../../components/AlertMessage";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";

import RecipesPage from "../pages/RecipesPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecipeEditorPage from "../pages/RecipeEditorPage";
import RecipeDetailPage from "../pages/RecipeDetailPage";
//import VerifyEmailPage from "../pages/VerifyEmailPage";
import NotFoundPage from "../pages/NotFoundPage";

import PrivateRoute from "../Routes/PrivateRoute";
import HomePage from "../pages/HomePage";

const PublicLayout = () => {
  return (
    <>
      <NavigationBar />
      <div className="page-container">
        <AlertMessage />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/recipes" component={RecipesPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/recipes/:id" component={RecipeDetailPage} />
          {/* <Route exact path="/verify/:code" component={VerifyEmailPage} /> */}

          <PrivateRoute exact path="/recipe/add" component={RecipeEditorPage} />
          <PrivateRoute
            exact
            path="/recipe/edit/:id"
            component={RecipeEditorPage}
          />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default PublicLayout;
