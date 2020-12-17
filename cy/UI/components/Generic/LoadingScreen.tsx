import React from "react";
import { Container, Spinner } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <Container fluid className="d-flex h-100 w-100 align-items-center justify-content-center">
      <Spinner as="span" animation="border" role="status" />
    </Container>
  );
};

export default LoadingScreen;
