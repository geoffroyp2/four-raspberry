import React from "react";
import { Card, Col, Row } from "react-bootstrap";

// Styling for the components to have a consistent style

type Props = {
  col: 1 | 2;
  content: {
    left: JSX.Element[];
    right?: JSX.Element[];
  };
};

const MainZone = (props: Props) => {
  const buttonCardStyle = { className: "shadow p-2 mt-1 justify-content-center", style: { height: "60px" } };
  const contentCardStyle = "shadow p-2 flex-grow-1 ";
  const colStyle = "flex-column d-flex ";

  return (
    <Row className="h-100 m-0 p-0">
      {props.col === 1 && (
        <Col className={colStyle + "p-0"}>
          <Card className={contentCardStyle}>{props.content.left[0]}</Card>
          <Card {...buttonCardStyle}>{props.content.left[1]}</Card>
        </Col>
      )}
      {props.col === 2 && (
        <>
          <Col className={colStyle + "pr-1 pl-0 col-6"}>
            <Card className={contentCardStyle}>{props.content.left[0]}</Card>
            <Card {...buttonCardStyle}>{props.content.left[1]}</Card>
          </Col>
          <Col className={colStyle + "pl-1 pr-0 col-6"}>
            <Card className="shadow p-2">{props.content.right![0]}</Card>
            <Card className={contentCardStyle + "mt-1"}>{props.content.right![1]}</Card>
            <Card {...buttonCardStyle}>{props.content.right![2]}</Card>
          </Col>
        </>
      )}
    </Row>
  );
};

export default MainZone;
