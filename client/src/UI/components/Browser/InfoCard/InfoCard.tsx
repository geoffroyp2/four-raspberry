import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import { selectedGraph } from "../../../redux/reducers/graphs/graphSlice";
import { formatDate } from "../../../utils/timeFormatting";
import ColorPicker from "./components/ColorPicker";
import InfoCardButtons from "./components/InfoCardButtons";
import ProgramDescription from "./components/ProgramDescription";
import ProgramName from "./components/ProgramName";
import { divider, infoLeftCol, infoMidCol, infoRow, infoRowSimple } from "./utils/styles";

type Props = {
  select: () => void;
};

const InfoCard = ({ select }: Props) => {
  const graph = useSelector(selectedGraph);

  return (
    <div className="d-flex flex-column h-100 justify-content-between">
      <Scrollbars style={{ height: "100%" }}>
        <Container className="flex-row justify-content-start">
          <ProgramName />
          {divider}
          <Row className={infoRow}>
            <Col className={infoLeftCol}>Type</Col>
            <Col className={infoMidCol}>{graph.graphType ? "Modèle" : "Cuisson"}</Col>
          </Row>
          {divider}
          <Row className={infoRow}>
            <Col className={infoLeftCol}>Couleur</Col>
            <Col className={infoMidCol}>
              <ColorPicker />
            </Col>
          </Row>
          {divider}
          <ProgramDescription />
          {divider}
          <Row className={infoRowSimple}>
            <Col className="pl-0" style={{ borderRight: "1px solid rgba(30, 30, 30, 0.8)" }}>
              <Col className="text-info">Date de création</Col>
              <Col>{formatDate(graph.date)}</Col>
            </Col>
            <Col className="pl-0">
              <Col className="text-info">Dernière modification</Col>
              <Col>{formatDate(graph.lastUpdated)}</Col>
            </Col>
          </Row>
        </Container>
      </Scrollbars>
      <Container>
        <Row className="pt-4">
          <Col>
            <InfoCardButtons select={select} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InfoCard;

/*

import React, { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";

import ColorPicker from "./colorPicker";
import ProgramInfosButtons from "./programInfosButtons";
import ProgramName from "./programName";
import ProgramDescription from "./programDescription";

import program from "../../../programLogic/program";
import { Graph } from "../../../interfaces/Igraph";
import { formatDate } from "../../../utils/timeFormatter";

const styles = {
  row: "align-items-start pt-1 pb-1 mt-1 mb-1",
  leftCol: "col-3 text-info align-text-top",
  midCol: "col-7",
  rightCol: "col-2",
};
const row = "align-items-baseline";

const divider = (
  <hr
    style={{
      borderTop: "1px solid rgba(30, 30, 30, 0.8)",
      margin: "0",
      padding: "0",
    }}
  />
);

type Props = {
  id: string;
  select: () => void;
  controls: {
    deleteGraph: () => void;
    createGraph: () => void;
    deletePending: boolean;
    createPending: boolean;
  };
};

const ProgramInfos = ({ id, select, controls }: Props) => {
  const [p, setP] = useState<Graph>({ ...program.graphs[id] });

  useEffect(() => {
    if (p._id !== id) setP({ ...program.graphs[id] });
    if (!program.UIRefresh["programInfo"])
      program.UIRefresh["programInfo"] = () => setP({ ...program.graphs[id] });
    return () => {
      delete program.UIRefresh["programInfo"];
    };
  }, [id, p]);

  return (
    <div className="d-flex flex-column h-100 justify-content-between">
      <Scrollbars style={{ height: "100%" }}>
        <Container className="flex-row justify-content-start">
          <ProgramName id={id} styles={styles} />
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
              <ColorPicker id={id} />
            </Col>
          </Row>
          {divider}
          <ProgramDescription id={id} styles={styles} />
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
        </Container>
      </Scrollbars>
      <Container>
        <Row className="pt-4">
          <Col>
            <ProgramInfosButtons loadGraph={select} controls={controls} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProgramInfos;

*/
