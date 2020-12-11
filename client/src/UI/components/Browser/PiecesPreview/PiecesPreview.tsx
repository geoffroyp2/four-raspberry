import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

import { divider, infoLeftCol, infoMidCol, infoRow } from "../InfoCard/utils/styles";
import ScrollZone from "../../Generic/ScrollZone";

const PiecesPreview = () => {
  return (
    <ScrollZone
      content={
        <Container className="pt-1  flex-row justify-content-start rounded pr-4">
          <Row className={infoRow}>
            <Col className={infoLeftCol}>Nombre de pièces</Col>
            <Col className={infoMidCol}> 8</Col>
          </Row>
          {divider}
          <Row className={infoRow}>
            <Col className={infoLeftCol}>Liste des pièces</Col>
            <Col className={infoMidCol}>
              <Table size="sm" variant="dark" striped bordered className="mb-2">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Type d'émail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pièce1</td>
                    <td>Cendres</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      }
    />
  );
};

export default PiecesPreview;
