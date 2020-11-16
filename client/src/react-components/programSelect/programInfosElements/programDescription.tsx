import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Form, FormControl } from "react-bootstrap";
import program from "../../../program-logic/program";
import EditButton from "../editButton";
import { colsValues } from "../styles/styles";

type Props = { id: string; refresh: () => void };

const ProgramDescription = ({ id, refresh }: Props) => {
  // // --------------------------------------------
  // //                Internal State
  // const [descriptionText, setDescriptionText] = useState<string>(
  //   program.currentSelectedProgram!.description
  // );
  // const [editing, setEditing] = useState<boolean>(false);
  // const [pendingValidation, setPendingValidation] = useState<boolean>(false);

  // const validate = useCallback(() => {
  //   setPendingValidation(true);
  //   program.graphEdit.editGraph(
  //     id,
  //     { description: descriptionText },
  //     (newGraph) => {
  //       setPendingValidation(false);
  //       setEditing(false);
  //       setDescriptionText(newGraph.description);
  //       refresh();
  //     }
  //   );
  // }, [id, descriptionText, refresh]);

  // // --------------------------------------------
  // // Force Refresh when a new program is selected
  // const [programId, setProgramId] = useState<string>(id);
  // useEffect(() => {
  //   if (programId !== id) {
  //     setProgramId(id);
  //     setDescriptionText(program.currentSelectedProgram!.description);
  //   }
  // }, [programId, id]);

  return (
    <Row>
      {/* <Col sm={colsValues[0]}>
        <Form.Label as="h5"> Description </Form.Label>
      </Col>
      <Col sm={colsValues[1]}>
        {editing ? (
          <FormControl
            as="textarea"
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
          />
        ) : (
          <Form.Text as="span">{descriptionText}</Form.Text>
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
      </Col> */}
    </Row>
  );
};

export default ProgramDescription;
