import React from "react";
import "../../stylesheets/App.css";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import AlertMessage from "../../components/AlertMessage";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AddEditRecipePage from "../pages/AddEditRecipePage";
import RecipeDetailPage from "../pages/RecipeDetailPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import NotFoundPage from "../pages/NotFoundPage";

import PrivateRoute from "../Routes/PrivateRoute";

const PublicLayout = () => {
  return (
    <>
      <NavigationBar />
      <Container className="page-container">
        <AlertMessage />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/recipes/:id" component={RecipeDetailPage} />
          <Route exact path="/verify/:code" component={VerifyEmailPage} />

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
      </Container>
      <Footer />
    </>
  );
};

export default PublicLayout;
