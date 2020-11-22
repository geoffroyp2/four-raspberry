import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  FormControl,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";
import { Point } from "../../../interfaces/programInterfaces";
import graphEditor from "../../../programLogic/graphEdit";
import program from "../../../programLogic/program";
import {
  getTimeInputString,
  getTimeInputMillis,
} from "../../../utils/timeFormatter";

// Idea to keep correct focus: istead of Points[], add a unique key to each value so the key is constant even if the row changes

type Props = {
  id: string;
  onClose: () => void;
};

const PointEdit = ({ id, onClose }: Props) => {
  // Refresh the graph display when component changes
  useEffect(() => {
    program.UIRefresh["programGraphPreview"]();
  });

  const [points, setPoints] = useState<Point[]>(
    [...program.graphs[id].points].sort((a, b) => a.x - b.x)
  );
  const [pointsMem, setPointsMem] = useState<Point[]>([
    ...program.graphs[id].points,
  ]);
  const [idMem, setIdMem] = useState<string>(id);
  const [pendingState, setPendingState] = useState<boolean>(false);

  // Handle reversing to saved data when cancelling
  useEffect(() => {
    if (id !== idMem) {
      setIdMem(id);
      setPointsMem([...program.graphs[id].points]);
    }
  }, [id, idMem]);

  //save, cancel
  const save = useCallback(() => {
    program.graphs[id].points = [...points];
    program.UIRefresh["programGraphPreview"]();
    setPendingState(true);
    graphEditor.editGraph(id, { points: points }, () => {
      setPendingState(false);
      onClose();
    });
  }, [onClose, points, id]);

  const cancel = useCallback(() => {
    program.graphs[id].points = [...pointsMem];
    program.UIRefresh["programGraphPreview"]();
    onClose();
  }, [onClose, pointsMem, id]);

  // Points modifications
  const newPoint = useCallback(() => {
    const newPoints = [...points];
    newPoints.push({ x: 0, y: 0 });
    newPoints.sort((a, b) => a.x - b.x);
    program.graphs[id].points = [...newPoints];
    setPoints(newPoints);
  }, [points, id]);

  const deletePoint = useCallback(
    (idx: number) => {
      const newPoints = [...points];
      newPoints.splice(idx, 1).sort((a, b) => a.x - b.x);
      program.graphs[id].points = [...newPoints];
      setPoints(newPoints);
    },
    [points, id]
  );

  const changePoint = useCallback(
    (xVal: number, yVal: number, idx: number) => {
      const newPoints = [...points];
      newPoints[idx] = { x: xVal, y: yVal };
      newPoints.sort((a, b) => a.x - b.x);
      program.graphs[id].points = [...newPoints];
      setPoints(newPoints);
    },
    [points, id]
  );

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
                          changePoint(
                            getTimeInputMillis(e.target.value),
                            p.y,
                            i
                          )
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
                        onChange={(e) => changePoint(p.x, +e.target.value, i)}
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => deletePoint(i)}
                        className="btn-sm btn-danger float-right"
                      >
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
              <Button className="btn-success" onClick={newPoint}>
                Nouveau Point
              </Button>
              <Button onClick={save}>
                {pendingState && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                  />
                )}
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
