import React from "react";
import { Container } from "react-bootstrap";
import MainZone from "./mainZone/mainZone";
// import MainZone from "./mainZone/mainZone";
// import SelectTabs from "./tabs/tabs";

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
        backgroundColor: "#333333",
      }}
    >
      <Container fluid className="p-0 m-0 w-100 h-100">
        <MainZone />
      </Container>
    </div>
  );
};

export default DisplayFour;
