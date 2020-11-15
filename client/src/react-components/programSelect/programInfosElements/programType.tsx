import React, { useCallback, useEffect, useState } from "react";
import { Col, Form, FormControl, Row } from "react-bootstrap";
import { GraphTypeString } from "../../../interfaces/Igraph";
import program from "../../../program-logic/program";
import EditButton from "../editButton";
import { colsValues } from "../styles/styles";

const graphTypes: { [key: string]: GraphTypeString } = {
  modèle: "modèle",
  cuisson: "cuisson",
};
type Props = { id: string; refresh: () => void };

const ProgramType = ({ id, refresh }: Props) => {
  // --------------------------------------------
  //                Internal State
  const [graphType, setGraphType] = useState<GraphTypeString>(
    program.currentSelectedProgram!.graphType
  );
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [pendingValidation, setPendingValidation] = useState<boolean>(false);

  const handleChange = useCallback((e) => {
    setGraphType(graphTypes[e.target.value]);
    setButtonDisabled(
      e.target.value === program.currentSelectedProgram!.graphType
    );
  }, []);

  // --------------------------------------------
  // Force Refresh when a new program is selected
  const [programId, setProgramId] = useState<string>(id);
  useEffect(() => {
    if (programId !== id) {
      setProgramId(id);
      setGraphType(program.currentSelectedProgram!.graphType);
    }
  }, [programId, id]);

  const validate = useCallback(() => {
    setPendingValidation(true);
    program.graphEdit.editGraph(
      id,
      { graphType: graphTypes[graphType] },
      (newGraph) => {
        setPendingValidation(false);
        setButtonDisabled(true);
        setGraphType(newGraph.graphType);
        refresh();
      }
    );
  }, [id, graphType, refresh]);

  return (
    <Row>
      <Col sm={colsValues[0]}>
        <Form.Label as="h5"> Type </Form.Label>
      </Col>
      <Col sm={colsValues[1]}>
        <FormControl
          as="select"
          size="sm"
          onChange={handleChange}
          defaultValue={graphType}
        >
          <option value="modèle">Modèle</option>
          <option value="cuisson">Cuisson</option>
        </FormControl>
      </Col>
      <Col sm={colsValues[2]}>
        <EditButton
          buttonState={true}
          pendingState={pendingValidation}
          disabled={buttonDisabled}
          onEdit={() => {}}
          onValid={validate}
        />
      </Col>
    </Row>
  );
};

export default ProgramType;
