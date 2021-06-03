import React from "react";
import { Switch, Route } from "react-router-dom";

import AlertMessage from "../../components/AlertMessage";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import AdminSideMenu from "../../components/AdminSideMenu";

import RecipeEditorPage from "../pages/RecipeEditorPage";
import RecipeDetailPage from "../pages/RecipeDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

import ProfilePage from "../Admin/ProfilePage";
import RecipeListPage from "../Admin/RecipeListPage";
import ListOfUsersPage from "../Admin/ListOfUsersPage";

const AdminLayout = () => {
  return (
    <>
      <NavigationBar />
      <div className="page-container dashboard">
        <AdminSideMenu />

        <AlertMessage />
        <Switch>
          <Route exact path="/user/profile" component={ProfilePage} />
          <Route exact path="/user/recipes" component={RecipeListPage} />
          <Route exact path="/user/recipes/:id" component={RecipeDetailPage} />
          <Route exact path="/user/recipe/add" component={RecipeEditorPage} />
          <Route
            exact
            path="/user/recipe/edit/:id"
            component={RecipeEditorPage}
          />
          <Route exact path="/user/list-of-users" component={ListOfUsersPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
