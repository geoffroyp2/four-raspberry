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

const ProgramName = ({ id, styles }: Props) => {
  const [name, setName] = useState<string>(program.graphs[id].name);
  const [editing, setEditing] = useState<boolean>(false);
  const [pendingValidation, setPendingValidation] = useState<boolean>(false);

  const validate = useCallback(() => {
    setPendingValidation(true);
    graphEditor.editGraph(id, { name: name }, (newGraph) => {
      setPendingValidation(false);
      setEditing(false);
      setName(newGraph.name);
    });
  }, [id, name]);

  return (
    <Row className={styles.row}>
      <Col className={styles.leftCol}>Nom</Col>
      <Col className={styles.midCol}>
        {editing ? (
          <FormControl
            as="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <span>{name}</span>
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

export default ProgramName;
