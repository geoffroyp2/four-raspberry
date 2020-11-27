import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import { loadTableState, pointEditState } from "../../redux/reducers/UIControlsSlice";

import ProgramTable from "./ProgramTable";
import InfoCard from "./InfoCard/InfoCard";
import PointEdit from "./InfoCard/PointEdit";
import GraphPreview from "./GraphPreview/GraphPreview";
import PiecesPreview from "./PiecesPreview/PiecesPreview";

import InfoCardButtons from "./Buttons/Zones/InfoCardButtons";
import PointEditModeButtons from "./Buttons/Zones/PointEditModeButtons";
import ProgramTableButtons from "./Buttons/Zones/ProgramTableButtons";
import StartButton from "./Buttons/Zones/StartButton";

const ProgramInfo = () => {
  const pointEditMode = useSelector(pointEditState);
  const showLoadTable = useSelector(loadTableState);

  const buttonCardStyle = { className: "shadow p-2 mt-1 justify-content-center", style: { height: "60px" } };
  const contentCardStyle = "shadow p-2 flex-grow-1 ";
  const colStyle = "flex-column d-flex ";

  return (
    <Container fluid className="p-1 w-100 h-100">
      <Row className="h-100 m-0 p-0">
        {showLoadTable ? (
          <Col className={colStyle + "p-0"}>
            <Card className={contentCardStyle}>
              <ProgramTable />
            </Card>
            <Card {...buttonCardStyle}>
              <ProgramTableButtons />
            </Card>
          </Col>
        ) : (
          <>
            <Col className={colStyle + "pr-1 pl-0 col-6"}>
              <Card className={contentCardStyle}>{pointEditMode ? <PointEdit /> : <InfoCard />}</Card>
              <Card {...buttonCardStyle}>{pointEditMode ? <PointEditModeButtons /> : <InfoCardButtons />}</Card>
            </Col>
            <Col className={colStyle + "pl-1 pr-0 col-6"}>
              <Card className="shadow p-2">
                <GraphPreview />
              </Card>
              <Card className={contentCardStyle + "mt-1"}>
                <PiecesPreview />
              </Card>
              <Card {...buttonCardStyle}>
                <StartButton />
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default ProgramInfo;
