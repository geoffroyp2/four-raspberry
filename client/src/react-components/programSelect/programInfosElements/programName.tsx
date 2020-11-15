import React, { useCallback, useEffect, useState } from "react";
import { Col, Form, FormControl, Row } from "react-bootstrap";
import program from "../../../program-logic/program";
import EditButton from "../editButton";
import { colsValues } from "../styles/styles";

type Props = { id: string; refresh: () => void };

const ProgramName = ({ id, refresh }: Props) => {
  // --------------------------------------------
  //                Internal State
  const [nameText, setNameText] = useState<string>(
    program.currentSelectedProgram!.name
  );
  const [editing, setEditing] = useState<boolean>(false);
  const [pendingValidation, setPendingValidation] = useState<boolean>(false);

  const validate = useCallback(() => {
    setPendingValidation(true);
    program.graphEdit.editGraph(id, { name: nameText }, (newGraph) => {
      setPendingValidation(false);
      setEditing(false);
      setNameText(newGraph.name);
      refresh();
    });
  }, [id, nameText, refresh]);

  // --------------------------------------------
  // Force Refresh when a new program is selected
  const [programId, setProgramId] = useState<string>(id);
  useEffect(() => {
    if (programId !== id) {
      setProgramId(id);
      setNameText(program.currentSelectedProgram!.name);
    }
  }, [programId, id]);

  return (
    <Row>
      <Col sm={colsValues[0]}>
        <Form.Label as="h5"> Nom </Form.Label>
      </Col>
      <Col sm={colsValues[1]}>
        {editing ? (
          <FormControl
            as="input"
            value={nameText}
            onChange={(e) => setNameText(e.target.value)}
          />
        ) : (
          <Form.Text as="span">{nameText}</Form.Text>
        )}
      </Col>
      <Col sm={colsValues[2]}>
        <EditButton
          buttonState={editing}
          pendingState={pendingValidation}
          disabled={false}
          onEdit={() => setEditing(true)}
          onValid={validate}
        />
      </Col>
    </Row>
  );
};

export default ProgramName;
