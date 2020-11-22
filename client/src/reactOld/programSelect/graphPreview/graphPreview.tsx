import React from "react";
import { Button, Card, Container } from "react-bootstrap";

import SimpleGraph from "./simpleGraph";

type Props = {
  id: string;
  pointEdit: () => void;
};

const GraphPreview = ({ id, pointEdit }: Props) => {
  return (
    <Card className="w-100 shadow p-2">
      <Container
        fluid
        className="w-100 m-0 p-1 mb-1 rounded shadow"
        style={{ backgroundColor: "#232323" }}
      >
        <SimpleGraph id={id} />
      </Container>
      <Container fluid className="w-100 m-0 p-0 mt-1">
        <Button
          className="float-right btn-sm btn-secondary"
          onClick={pointEdit}
        >
          Modifier les points
        </Button>
      </Container>
    </Card>
  );
};

export default GraphPreview;
