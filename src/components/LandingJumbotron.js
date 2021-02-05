import React from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";

const LandingJumbotron = () => {
  return (
    <Jumbotron fluid className="jumbotron-landing">
      <Container>
        <h1>Welcome to Cook Yourself</h1>
        <p>This is where we share the best dishes we have.</p>
        <p>
          <Button variant="secondary">Discover</Button>
        </p>
      </Container>
    </Jumbotron>
  );
};

export default LandingJumbotron;
