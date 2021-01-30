import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import notFound404 from "../../images/404-error.png";

const NotFoundPage = () => {
  return (
    <Container className="page-container">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>404</h1>
          <p>The page you are looking for does not exist.</p>
          <img src={notFound404} alt="404 Error" />
        </Col>
      </Row>
    </Container>
  );
};
export default NotFoundPage;
