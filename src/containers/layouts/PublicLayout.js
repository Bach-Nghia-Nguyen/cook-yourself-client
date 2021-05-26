import React from "react";

// import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import AlertMessage from "../../components/AlertMessage";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AddEditRecipePage from "../pages/AddEditRecipePage";
import RecipeDetailPage from "../pages/RecipeDetailPage";
//import VerifyEmailPage from "../pages/VerifyEmailPage";
import NotFoundPage from "../pages/NotFoundPage";

import PrivateRoute from "../Routes/PrivateRoute";
import LandingPage from "../pages/LandingPage";

const PublicLayout = () => {
  return (
    <>
      <NavigationBar />
      <div className="page-container">
        <AlertMessage />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/landing" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/recipes/:id" component={RecipeDetailPage} />
          {/* <Route exact path="/verify/:code" component={VerifyEmailPage} /> */}

          <PrivateRoute
            exact
            path="/recipe/add"
            component={AddEditRecipePage}
          />
          <PrivateRoute
            exact
            path="/recipe/edit/:id"
            component={AddEditRecipePage}
          />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default PublicLayout;
