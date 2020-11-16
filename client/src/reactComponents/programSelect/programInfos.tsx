import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import program from "../../program-logic/program";
import { formatDate } from "../../utils/timeFormatter";
import ColorPicker from "./utils/colorPicker";

import ProgramInfoButtons from "./programInfoButtons";
import ProgramName from "./programInfosElements/programName";
import ProgramDescription from "./programInfosElements/programDescription";

type Props = {
  id: string;
  select: () => void;
};
const styles = {
  row: "align-items-center pt-1 pb-1 mt-1 mb-1",
  leftCol: "col-3 text-info align-text-top",
  midCol: "col-7",
  rightCol: "col-2",
};

const divider = (
  <hr
    style={{
      borderTop: "1px solid rgba(30, 30, 30, 0.8)",
      margin: "0",
      padding: "0",
    }}
  />
);
const row = "align-items-baseline";

const ProgramInfos = ({ id, select }: Props) => {
  const p = program.graphs[id];

  return (
    <Card className="h-100 shadow p-2 flex-column justify-content-between">
      <Container className="flex-row justify-content-start">
        <ProgramName id={id} styles={styles} />
        {divider}
        <ProgramDescription id={id} styles={styles} />
        {divider}
        <Row className={styles.row}>
          <Col className={styles.leftCol}>Type</Col>
          <Col className={styles.midCol}>
            {p.graphType ? "Modèle" : "Cuisson"}
          </Col>
        </Row>
        {divider}
        <Row className={styles.row}>
          <Col className={styles.leftCol}>Couleur</Col>
          <Col className={styles.midCol}>
            <ColorPicker id={id} onChange={() => {}} />
          </Col>
        </Row>
      </Container>
      <Container>
        {divider}
        <Row className={row}>
          <Col
            className="pl-0"
            style={{ borderRight: "1px solid rgba(30, 30, 30, 0.8)" }}
          >
            <Col className="text-info">Date de création</Col>
            <Col>{formatDate(p.date)}</Col>
          </Col>
          <Col className="pl-0">
            <Col className="text-info">Dernière modification</Col>
            <Col>{formatDate(p.lastUpdated)}</Col>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <ProgramInfoButtons
              suppr={() => {}}
              create={() => {}}
              load={select}
              modify={() => {}}
            />
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default ProgramInfos;
