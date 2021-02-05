import React from "react";
import "../../stylesheets/App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import AlertMessage from "../../components/AlertMessage";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import AdminSideMenu from "../../components/AdminSideMenu";

import AddEditRecipePage from "../pages/AddEditRecipePage";
import RecipeDetailPage from "../pages/RecipeDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

import ProfilePage from "../Admin/ProfilePage";
import RecipeListPage from "../Admin/RecipeListPage";
import ListOfUsersPage from "../Admin/ListOfUsersPage";

const AdminLayout = () => {
  return (
    <>
      <NavigationBar />
      <Container className="page-container" fluid>
        <Row>
          <AdminSideMenu />
          <Col>
            <AlertMessage />
            <Switch>
              <Route exact path="/admin/profile" component={ProfilePage} />
              <Route exact path="/admin/recipes" component={RecipeListPage} />
              <Route
                exact
                path="/admin/recipes/:id"
                component={RecipeDetailPage}
              />
              <Route
                exact
                path="/admin/recipe/add"
                component={AddEditRecipePage}
              />
              <Route
                exact
                path="/admin/recipe/edit/:id"
                component={AddEditRecipePage}
              />
              <Route
                exact
                path="/admin/list-of-users"
                component={ListOfUsersPage}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default AdminLayout;
