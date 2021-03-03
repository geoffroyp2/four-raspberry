import React, { FC } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import "./styles/collapsable.scss";

import CollapseButton from "./SmallElements/CollapseButton";

type Props = {
  className?: string;
  buttonSize?: number;
  header?: JSX.Element | JSX.Element[] | false;
  children: JSX.Element | JSX.Element[] | false;
};

const CollapsableZone: FC<Props> = ({ header, children, className, buttonSize }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Container fluid className={`mt-1 pt-1 pb-1 collapsable-zone collapsable-zone-line ${className}`}>
        <Row>
          {header && <Col>{header}</Col>}
          <Col className="d-flex justify-content-end">
            <CollapseButton eventKey="0" size={buttonSize} />
          </Col>
        </Row>
        <Accordion.Collapse eventKey="0">
          <Row>
            <Col>{children}</Col>
          </Row>
        </Accordion.Collapse>
      </Container>
    </Accordion>
  );
};

export default CollapsableZone;
