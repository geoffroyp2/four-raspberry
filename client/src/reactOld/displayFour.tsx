import React from "react";
import { Container } from "react-bootstrap";
// import MainZone from "./mainZone";

const DisplayFour = () => {
  return (
    <div
      style={{
        width: 1024,
        height: 600,
        borderColor: "#888888",
        color: "#CCCCCC",
        // Only for desktop version
        border: "solid",
        borderWidth: 1,
        margin: 20,
        backgroundColor: "#424242",
      }}
    >
      <Container fluid className="p-0 m-0 w-100 h-100">
        {/* <MainZone /> */}
      </Container>
    </div>
  );
};

export default DisplayFour;
