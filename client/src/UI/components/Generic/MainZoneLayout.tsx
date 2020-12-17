import React from "react";
import { Card, Col, Row } from "react-bootstrap";

// Styling for the components to have a consistent style

type Props = {
  left: JSX.Element[];
  right?: JSX.Element[];
  bottomRow?: JSX.Element[];
};

const MainZoneLayout = ({ left, right, bottomRow }: Props) => {
  const buttonCardStyle = { className: "shadow p-0 mt-1 justify-content-center ", style: { height: "60px" } };
  const contentCardStyle = "shadow p-1 flex-grow-1 ";
  const colStyle = "flex-column d-flex ";

  return (
    <Row className="h-100 m-0 p-0">
      {right === undefined && bottomRow === undefined && (
        <Col className={colStyle + "p-0"}>
          <Card className={contentCardStyle}>{left[0]}</Card>
          <Card {...buttonCardStyle}>{left[1]}</Card>
        </Col>
      )}
      {right && bottomRow === undefined && (
        <>
          <Col className={colStyle + "pr-1 pl-0 col-6"}>
            <Card className={contentCardStyle}>{left[0]}</Card>
            <Card {...buttonCardStyle}>{left[1]}</Card>
          </Col>
          <Col className={colStyle + "pl-0 pr-0 col-6"}>
            <Card className="shadow p-1">{right[0]}</Card>
            <Card className={contentCardStyle + "mt-1"}>{right[1]}</Card>
            {/* <Card {...buttonCardStyle}>{right[2]}</Card> */}
          </Col>
        </>
      )}
      {right && bottomRow && (
        <>
          <div>TODO: LAYOUT</div>
        </>
      )}
    </Row>
  );
};

export default MainZoneLayout;
