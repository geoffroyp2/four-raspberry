import React, { useCallback, useState } from "react";
import { Button, ButtonGroup, Col, Container, FormControl, Row, Spinner, Table } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import db from "../../../../db/handler";
import { Point } from "../../../../interfaces/programInterfaces";
import {
  selectedGraphPoints,
  selectedGraphId,
  setPoints,
  setPoint,
  deletePoint,
  addNewPoint,
} from "../../../redux/reducers/graphs/graphSlice";
import { getTimeInputMillis, getTimeInputString } from "../../../utils/timeFormatting";

type Props = {
  close: () => void;
};

const PointEdit = ({ close }: Props) => {
  const points = useSelector(selectedGraphPoints);
  const id = useSelector(selectedGraphId);
  const dispatch = useDispatch();

  const [PointsMem] = useState<Point[]>([...points]);
  const [PendingState, setPendingState] = useState<boolean>(false);

  const cancel = useCallback(() => {
    dispatch(setPoints(PointsMem));
    close();
  }, [PointsMem, dispatch, close]);

  const save = useCallback(() => {
    setPendingState(true);
    db.updateGraph(id, { points: points }, (newGraph) => {
      setPendingState(false);
      dispatch(setPoints(newGraph.points));
      close();
    });
  }, [dispatch, close, id, points]);

  return (
    <div className="d-flex flex-column h-100 justify-content-between">
      <Scrollbars style={{ height: "100%" }}>
        <Container className="flex-row justify-content-start">
          <Table size="sm" variant="dark" striped bordered>
            <thead>
              <tr>
                <th style={{ width: "50%" }}>Temps</th>
                <th style={{ width: "40%" }}>Température</th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
            <tbody>
              {points.map((p, i) => {
                return (
                  <tr key={`T${i}`}>
                    <td>
                      <FormControl
                        as="input"
                        type="time"
                        size="sm"
                        step={600}
                        value={getTimeInputString(p.x)}
                        onChange={(e) =>
                          dispatch(setPoint({ nPoint: { x: getTimeInputMillis(e.target.value), y: p.y }, idx: i }))
                        }
                      />
                    </td>
                    <td>
                      <FormControl
                        as="input"
                        type="number"
                        min={0}
                        size="sm"
                        value={p.y}
                        onChange={(e) => dispatch(setPoint({ nPoint: { x: p.x, y: +e.target.value }, idx: i }))}
                      />
                    </td>
                    <td>
                      <Button onClick={() => dispatch(deletePoint(i))} className="btn-sm btn-danger float-right">
                        X
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </Scrollbars>
      <Container>
        <Row className="pt-4 justify-content-between">
          <Col className="col-2">
            <Button className="btn-danger" onClick={cancel}>
              Annuler
            </Button>
          </Col>
          <Col>
            <ButtonGroup className="float-right">
              <Button className="btn-success" onClick={() => dispatch(addNewPoint())}>
                Nouveau Point
              </Button>
              <Button onClick={save}>
                {PendingState && <Spinner as="span" animation="border" size="sm" role="status" />}
                <span className="pl-1">Enregistrer</span>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PointEdit;
