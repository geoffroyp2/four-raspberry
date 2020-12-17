import ScrollZone from "@UITabs/sharedComponents/ScrollZone";
import React from "react";
import { Container } from "react-bootstrap";

const RecordPieceList = () => {
  return <ScrollZone content={<Container className="pt-1  flex-row justify-content-start rounded pr-4">Pieces</Container>} />;
};

export default RecordPieceList;
