import React from "react";
import { Card, Col, Row } from "react-bootstrap";

// Styling for the components to have a consistent style

type Props = {
  fullSpace?: JSX.Element;

  topLeft?: JSX.Element;
  bottomLeft?: JSX.Element;
  leftCol?: JSX.Element;
  leftColButtons?: JSX.Element;

  topRight?: JSX.Element;
  bottomRight?: JSX.Element;
  rightCol?: JSX.Element;

  // bottomRow?: JSX.Element;
};

const MainZoneLayout = ({ fullSpace, topLeft, bottomLeft, leftCol, leftColButtons, topRight, bottomRight, rightCol }: Props) => {
  const buttonCardStyle = { className: "shadow p-0 mt-1 justify-content-center ", style: { height: "60px" } };
  const contentCardStyle = "shadow p-1 flex-grow-1 ";
  const colStyle = "flex-column d-flex ";

  const fullSpaceElement = fullSpace && (
    <Col className={colStyle + "p-0"}>
      <Card className={contentCardStyle}>{fullSpace}</Card>
      <Card {...buttonCardStyle}>{leftColButtons}</Card>
    </Col>
  );

  const left = leftCol ? (
    <Col className={colStyle + "pr-1 pl-0 col-6"}>
      <Card className={contentCardStyle}>{leftCol}</Card>
      <Card {...buttonCardStyle}>{leftColButtons}</Card>
    </Col>
  ) : (
    <Col className={colStyle + "pr-1 pl-0 col-6"}>
      <Card className={contentCardStyle + "p-1"}>{topLeft}</Card>
      <Card className={contentCardStyle + "mt-1"}>{bottomLeft}</Card>
      <Card {...buttonCardStyle}>{leftColButtons}</Card>
    </Col>
  );

  const right = rightCol ? (
    <Col className={colStyle + "pr-1 pl-0 col-6"}>
      <Card className={contentCardStyle}>{rightCol}</Card>
    </Col>
  ) : (
    <Col className={colStyle + "pl-0 pr-0 col-6"}>
      <Card className={contentCardStyle + "p-1"}>{topRight}</Card>
      <Card className={contentCardStyle + "mt-1"}>{bottomRight}</Card>
    </Col>
  );

  return <Row className="h-100 m-0 p-0">{fullSpaceElement || [left, right]}</Row>;
};

export default MainZoneLayout;
