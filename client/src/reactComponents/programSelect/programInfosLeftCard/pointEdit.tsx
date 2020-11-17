import React, { useCallback, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";
import program from "../../../programLogic/program";
import { getHours, getMinutes } from "../../../utils/timeFormatter";

type Entry = {
  h: number;
  m: number;
  t: number;
};
type Props = {
  id: string;
  onClose: () => void;
};

const PointEdit = ({ id, onClose }: Props) => {
  const points: Entry[] = program.graphs[id].points.map((p) => {
    return { h: getHours(p.x), m: getMinutes(p.x), t: p.y };
  });

  const onSave = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div className="d-flex flex-column h-100 justify-content-between">
      <Scrollbars style={{ height: "100%" }}>
        <Container className="flex-row justify-content-start">
          <Table size="sm" variant="dark" striped bordered>
            <thead>
              <tr>
                <th>Temps</th>
                <th>Température</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {points.map((p, i) => {
                return (
                  <tr key={`${p.t}${i}`}>
                    <td>
                      <Row>
                        <Col>
                          <EditField
                            t={false}
                            append={"h"}
                            v={p.h}
                            onChange={(v) => {
                              points[i].h = v;
                            }}
                          />
                        </Col>
                        <Col>
                          <EditField
                            t={false}
                            append={"m"}
                            v={p.h}
                            onChange={(v) => {
                              points[i].h = v;
                            }}
                          />
                        </Col>
                      </Row>
                    </td>
                    <td>
                      <EditField
                        t={true}
                        append={"°C"}
                        v={p.t}
                        onChange={(v) => {
                          points[i].t = v;
                        }}
                      />
                    </td>
                    <td>
                      <Button className="btn-sm btn-danger float-right">
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
        <Row className="pt-4">
          <Col>
            <ButtonGroup className="float-right">
              <Button className="btn-success">Nouveau Point</Button>
              <Button onClick={onSave}>Enregistrer</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PointEdit;

type EditFieldProps = {
  t: boolean;
  append: string;
  v: number;
  onChange: (v: number) => void;
};
const EditField = ({ t, v, append, onChange }: EditFieldProps) => {
  const [val, setVal] = useState<number>(v);
  const change = useCallback(
    (v: number) => {
      setVal(v);
      onChange(v);
    },
    [onChange]
  );
  return (
    <InputGroup size="sm">
      <FormControl
        as="input"
        type="number"
        size="sm"
        min={0}
        max={t ? 2000 : 59}
        value={val}
        onChange={(e) => change(+e.target.value)}
      />
      <InputGroup.Append>
        <InputGroup.Text>{append}</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
};
