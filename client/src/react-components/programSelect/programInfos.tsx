import React from "react";
import { Container, Form } from "react-bootstrap";
import ProgramDescription from "./programInfosElements/programDescription";
import ProgramName from "./programInfosElements/programName";
import ProgramType from "./programInfosElements/programType";

type Props = { id: string };

const ProgramInfos = ({ id }: Props) => {
  return (
    <Container className="p-1 pl-2 m-0 border">
      <Form>
        {/* <ProgramName id={id} />
        <ProgramDescription id={id} />
        <ProgramType id={id} /> */}
      </Form>
    </Container>
  );
};
export default ProgramInfos;
