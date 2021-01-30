import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AdminSideMenu = () => {
  return (
    <Nav className="col-md-3 cole-lg-2 d-md-block bg-light sidebar collapse">
      <div className="sidebar-sticky pt-3">
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/admin/profile"
            activeClassName="active"
            strict={true}
          >
            Profile
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/admin/recipes"
            activeClassName="active"
            strict={true}
          >
            Recipes
          </Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default AdminSideMenu;
