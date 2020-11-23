import React, { useCallback, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row, Spinner } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphPoints, setPoints, addNewPoint, selectedGraph, updateGraph } from "../../../redux/reducers/graphSlice";
import { setPointEdit } from "../../../redux/reducers/UIControlsSlice";

import EditTable from "./EditTable";

import db from "../../../../db/handler";
import { Point } from "../../../../interfaces/programInterfaces";
import { Graph } from "../../../../interfaces/Igraph";

const PointEdit = () => {
  const points = useSelector(selectedGraphPoints);
  const graph = useSelector(selectedGraph);
  const dispatch = useDispatch();

  const [PointsMem] = useState<Point[]>([...points]);
  const [PendingState, setPendingState] = useState<boolean>(false);

  const cancel = useCallback(() => {
    dispatch(setPoints(PointsMem));
    dispatch(setPointEdit(false));
  }, [PointsMem, dispatch]);

  const save = useCallback(() => {
    setPendingState(true);
    db.updateGraph(graph, (res: Graph) => {
      setPendingState(false);
      dispatch(updateGraph(res));
      dispatch(setPointEdit(false));
    });
  }, [dispatch, graph]);

  return (
    <div className="d-flex flex-column h-100 justify-content-between">
      <Scrollbars style={{ height: "100%" }}>
        <Container className="flex-row justify-content-start rounded shadow pt-2 pb-1" style={{ backgroundColor: "#232323" }}>
          <EditTable />
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
              <Button className="btn-info" onClick={() => dispatch(addNewPoint())}>
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
