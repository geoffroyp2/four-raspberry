import React from "react";
import { Button, Col, FormControl, InputGroup, Row, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import {
  CurrentRecordPoints,
  setRecordAllPoints,
  setRecordOnePoint,
  setRecordPointHour,
  setRecordPointMinute,
  deleteRecordPoint,
  addRecordNewPoint,
} from "@redux/dataReducers/recordSlice";
import {
  CurrentReferencePoints,
  setReferenceAllPoints,
  setReferenceOnePoint,
  setReferencePointHour,
  setReferencePointMinute,
  deleteReferencePoint,
  addReferenceNewPoint,
} from "@redux/dataReducers/referenceSlice";

import { getHours, getMinutes } from "@UIutils/timeFormat";

const actions = {
  Record: {
    points: CurrentRecordPoints,
    setAllPoints: setRecordAllPoints,
    setOnePoint: setRecordOnePoint,
    setPointHour: setRecordPointHour,
    setPointMinute: setRecordPointMinute,
    deletePoint: deleteRecordPoint,
    addPoint: addRecordNewPoint,
  },
  Reference: {
    points: CurrentReferencePoints,
    setAllPoints: setReferenceAllPoints,
    setOnePoint: setReferenceOnePoint,
    setPointHour: setReferencePointHour,
    setPointMinute: setReferencePointMinute,
    deletePoint: deleteReferencePoint,
    addPoint: addReferenceNewPoint,
  },
};

type Props = {
  graphType: "Record" | "Reference";
};

const PointEditTable = ({ graphType }: Props) => {
  const points = useSelector(actions[graphType].points);
  const dispatch = useDispatch();

  return (
    <Table size="sm" variant="dark" striped bordered className="mb-1">
      <thead>
        <tr>
          <th style={{ width: "50%" }}>Temps</th>
          <th>Température</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {points.map((p, i) => {
          return (
            <tr key={`PointEdit${i}`}>
              <td>
                <Row className="d-flex justify-content-between align-items-center">
                  <Col className="col-6 pr-1">
                    <InputGroup size="sm">
                      <FormControl
                        as="select"
                        size="sm"
                        value={getHours(p.x)}
                        onChange={(e) => {
                          dispatch(actions[graphType].setPointHour({ idx: i, val: +e.target.value }));
                        }}
                      >
                        {[...Array(24)].map((x, i) => (
                          <option key={`h${i}`} value={i}>
                            {i}
                          </option>
                        ))}
                      </FormControl>
                      <InputGroup.Append>
                        <InputGroup.Text>h</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                  <Col className="col-6 pl-1">
                    <InputGroup size="sm">
                      <FormControl
                        as="select"
                        size="sm"
                        value={getMinutes(p.x)}
                        onChange={(e) => {
                          dispatch(actions[graphType].setPointMinute({ idx: i, val: +e.target.value }));
                        }}
                      >
                        {[...Array(12)].map((x, i) => (
                          <option key={`m${i}`} value={5 * i}>
                            {5 * i}
                          </option>
                        ))}
                      </FormControl>
                      <InputGroup.Append>
                        <InputGroup.Text>m</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                </Row>
              </td>
              <td className="">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col>
                    <InputGroup size="sm">
                      <FormControl
                        as="input"
                        type="number"
                        min={0}
                        size="sm"
                        value={p.y}
                        onChange={(e) =>
                          dispatch(actions[graphType].setOnePoint({ point: { x: p.x, y: +e.target.value }, idx: i }))
                        }
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>°C</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                </Row>
              </td>
              <td className="d-flex justify-content-center align-items-center">
                <Row>
                  <Col>
                    <Button onClick={() => dispatch(actions[graphType].deletePoint(i))} className="btn-sm btn-danger">
                      X
                    </Button>
                  </Col>
                </Row>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={3}>
            <Row>
              <Col className="mr-2 pr-2">
                <Button className="btn-info btn-sm float-right" onClick={() => dispatch(actions[graphType].addPoint())}>
                  Nouveau Point
                </Button>
              </Col>
            </Row>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default PointEditTable;
