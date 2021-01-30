import React from "react";
import { Row, Col, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar className="main-footer-container" expand="lg">
      <Row className="row footer-site-links">
        {/* Column 1 */}
        <Col className="col-4 about-us">
          <h4>Cook Yourself Inc</h4>
          <ul className="list-unstyled">
            <li>034xxxxx98</li>
            <li>Ho Chi Minh City, Vietnam</li>
            <li>346 Ben Van Don St, Ward 1, District 4.</li>
          </ul>
        </Col>

        {/* Column 2 */}
        <Col className="col-3">
          <h4>Something here</h4>
          <ul className="list-unstyled">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </Col>

        {/* Column 3 */}
        <Col className="col-3 policy">
          <h4>Something here</h4>
          <ul className="list-unstyled">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </Col>
      </Row>

      <hr />

      <Row className="bottom-row">
        <Col className="col-lg">
          &copy;{new Date().getFullYear()} Cook Yourself Inc | All right
          reserved | Term of Service | Privacy
        </Col>
      </Row>
    </Navbar>
  );
};

export default Footer;
