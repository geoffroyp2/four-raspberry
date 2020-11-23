import React from "react";
import { Button, Col, FormControl, InputGroup, Row, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import {
  addNewPoint,
  deletePoint,
  selectedGraphPoints,
  setPoint,
  setPointHour,
  setPointMinute,
} from "../../../redux/reducers/graphSlice";

import { getHours, getMinutes } from "../../../utils/timeFormatting";

const EditTable = () => {
  const points = useSelector(selectedGraphPoints);
  const dispatch = useDispatch();

  return (
    <Table size="sm" variant="dark" striped bordered>
      <thead>
        <tr>
          <th>Temps</th>
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
                          dispatch(setPointHour({ idx: i, val: +e.target.value }));
                        }}
                      >
                        {[...Array(16)].map((x, i) => (
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
                          dispatch(setPointMinute({ idx: i, val: +e.target.value }));
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
                        onChange={(e) => dispatch(setPoint({ nPoint: { x: p.x, y: +e.target.value }, idx: i }))}
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
                    <Button onClick={() => dispatch(deletePoint(i))} className="btn-sm btn-danger">
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
                <Button className="btn-info btn-sm float-right" onClick={() => dispatch(addNewPoint())}>
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

export default EditTable;
