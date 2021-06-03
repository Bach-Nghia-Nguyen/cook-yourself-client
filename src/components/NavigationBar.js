import React from "react";
import { Navbar, Nav, DropdownButton, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/cook_yourself_white.png";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const authLinks = (
    <Nav>
      <Button
        className="create-recipe"
        variant="warning"
        as={Link}
        to="/recipe/add"
      >
        New Recipe
      </Button>

      {currentUser && (
        <img
          src={currentUser.avatarUrl}
          alt="avatar"
          className="outside-avatar"
        />
      )}

      <DropdownButton
        variant="success"
        className="drop-down-profile"
        title=""
        id="dropDownProfile"
        menuAlign="right"
      >
        <Dropdown.Item eventKey="1">
          User:
          <div>
            {currentUser && (
              <img
                src={currentUser.avatarUrl}
                alt="avatar"
                className="avatar"
              />
            )}
            <strong>{currentUser && currentUser.name}</strong>
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="2" as={Link} to="/user/profile">
          <FontAwesomeIcon icon="chart-line" size="sm" /> My profile
        </Dropdown.Item>
        <Dropdown.Item eventKey="3" onClick={handleLogout}>
          <FontAwesomeIcon icon="sign-out-alt" size="sm" /> Log out
        </Dropdown.Item>
      </DropdownButton>
    </Nav>
  );

  const publicLinks = (
    <Nav>
      <Nav.Link as={Link} to="/register">
        <FontAwesomeIcon icon="registered" size="sm" /> Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        <FontAwesomeIcon icon="sign-in-alt" size="sm" /> Login
      </Nav.Link>
    </Nav>
  );

  // #ffdd9c

  return (
    <Navbar sticky="top" className="navigation-bar">
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        <img src={logo} alt="Cook Yourself" width="200px" />
      </Navbar.Brand>

      <Nav className="mr-auto"></Nav>
      {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
    </Navbar>
  );
};

export default NavigationBar;
