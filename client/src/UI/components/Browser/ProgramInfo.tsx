import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { loadTableState, pointEditState } from "../../redux/reducers/UIControlsSlice";
import GraphPreview from "./GraphPreview/GraphPreview";
import PointEdit from "./GraphPreview/PointEdit";
import InfoCard from "./InfoCard/InfoCard";
import PiecesPreview from "./PiecesPreview/PiecesPreview";
import ProgramTable from "./ProgramTable";

const ProgramInfo = () => {
  const pointEditMode = useSelector(pointEditState);
  const showLoadTable = useSelector(loadTableState);

  return (
    <Container fluid className="p-1 w-100 h-100">
      {showLoadTable ? (
        <ProgramTable />
      ) : (
        <Container fluid className="h-100 p-0 m-0">
          <Row className="h-100 m-0 p-0">
            <Col className="h-100 pr-1 pl-0">
              <Card className="h-100 shadow p-2">{pointEditMode ? <PointEdit /> : <InfoCard />}</Card>
            </Col>
            <Col className="w-100 pl-1 pr-0">
              <Row className="w-100 m-0 mb-1">
                <GraphPreview />
              </Row>
              <Row className="w-100 m-0">
                <PiecesPreview />
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default ProgramInfo;
