import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../images/Cook-Yourself-Logo.png";

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <img src={logo} alt="Cook Yourself Logo" width="200px" />
      </Navbar.Brand>

      <Nav className="mr-auto">
        <Nav.Link href="#home">Login</Nav.Link>
        <Nav.Link href="#features">Register</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
