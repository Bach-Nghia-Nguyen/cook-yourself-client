import React from "react";
import "../../stylesheets/App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import AlertMessage from "../../components/AlertMessage";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import CustomerSideMenu from "../../components/CustomerSideMenu";

import NotFoundPage from "../pages/NotFoundPage";

import ProfilePage from "../Customer/ProfilePage";

const CustomerLayout = () => {
  return (
    <>
      <NavigationBar />

      <Container className="page-container" fluid>
        <Row>
          <CustomerSideMenu />
          <Col>
            <AlertMessage />
            <Switch>
              <Route exact path="/user/profile" component={ProfilePage} />

              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default CustomerLayout;
