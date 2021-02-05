import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import notFound404 from "../../images/404-error.png";

const NotFoundPage = () => {
  return (
    <Container className="page-container">
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 2 }}>
          <img src={notFound404} alt="404 Error" />
        </Col>
      </Row>
    </Container>
  );
};
export default NotFoundPage;
