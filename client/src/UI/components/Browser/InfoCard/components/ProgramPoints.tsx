import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../utils/styles";

import { useSelector } from "react-redux";
import { selectedGraphPoints } from "../../../../redux/reducers/graphSlice";
import PointEditButton from "../../Buttons/Individual/PointEditButton";

import { formatTime } from "../../../../utils/timeFormatting";

const ProgramPoints = () => {
  const points = useSelector(selectedGraphPoints);

  return (
    <>
      <Row className={infoRow + "pb-0 mb-0"}>
        <Col className={infoLeftCol}>
          <p>Points</p>
          <p>
            <PointEditButton />
          </p>
        </Col>
        <Col className={infoMidCol}>
          <Table size="sm" variant="dark" striped bordered className="mb-2">
            <thead>
              <tr>
                <th>Temps</th>
                <th>Température</th>
              </tr>
            </thead>
            <tbody>
              {points.length > 0 ? (
                points.map((p, i) => {
                  return (
                    <tr key={`PointsPreview${i}`}>
                      <td>{formatTime(p.x, true)}</td>
                      <td>{`${p.y}°C`}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>-</td>
                  <td>-</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>{" "}
      {divider}
    </>
  );
};

export default ProgramPoints;
