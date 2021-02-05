import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const CustomerSideMenu = () => {
  return (
    <Nav className="col-md-3 cole-lg-2 d-md-block bg-light sidebar collapse">
      <div className="sideba-sticky pt-3">
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/user/account-info"
            activeClassName="active"
            strict={true}
          >
            My Account
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/user/recipes"
            activeClassName="active"
            strict={true}
          >
            My Recipes
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/user/basket"
            activeClassName="active"
            strict={true}
          >
            My Shopping Basket
          </Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default CustomerSideMenu;
