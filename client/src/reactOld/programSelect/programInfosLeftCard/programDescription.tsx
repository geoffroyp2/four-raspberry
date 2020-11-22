import React, { useCallback, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";

import EditButton from "./editButton";

import program from "../../../programLogic/program";
import graphEditor from "../../../programLogic/graphEdit";

type Props = {
  id: string;
  styles: {
    row: string;
    leftCol: string;
    midCol: string;
    rightCol: string;
  };
};

const ProgramDescription = ({ id, styles }: Props) => {
  const [description, setDescription] = useState<string>(
    program.graphs[id].description
  );
  const [editing, setEditing] = useState<boolean>(false);
  const [pendingValidation, setPendingValidation] = useState<boolean>(false);

  const validate = useCallback(() => {
    setPendingValidation(true);
    graphEditor.editGraph(id, { description: description }, (newGraph) => {
      setPendingValidation(false);
      setEditing(false);
      setDescription(newGraph.description);
    });
  }, [id, description]);

  return (
    <Row className={styles.row}>
      <Col className={styles.leftCol}>Description</Col>
      <Col className={styles.midCol}>
        {editing ? (
          <FormControl
            as="textarea"
            value={description}
            rows={Math.ceil(description.length / 30)}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <span>{description}</span>
        )}
      </Col>

      <Col className={styles.rightCol}>
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

export default ProgramDescription;
