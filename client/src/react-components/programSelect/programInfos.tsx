import React from "react";
import { Container, Form } from "react-bootstrap";
import ProgramDescription from "./programInfosElements/programDescription";
import ProgramName from "./programInfosElements/programName";
import ProgramType from "./programInfosElements/programType";

type Props = { id: string; refresh: () => void };

const ProgramInfos = ({ id, refresh }: Props) => {
  return (
    <Container className="p-1 pl-2 m-0 border">
      <Form>
        <ProgramName id={id} refresh={refresh} />
        <ProgramDescription id={id} refresh={refresh} />
        <ProgramType id={id} refresh={refresh} />
      </Form>
    </Container>
  );
};
export default ProgramInfos;
