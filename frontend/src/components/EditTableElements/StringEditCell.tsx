import React, { FC, useEffect, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import "../styles/editTable.scss";

import CancelIcon from "@src/assets/CancelIcon";
import ConfirmIcon from "@src/assets/ConfirmIcon";
import EditIcon from "@src/assets/EditIcon";

type Props = {
  data: string;
  validate: (newData: string) => void;
};

const StringEditCell: FC<Props> = ({ data, validate }) => {
  const [Edit, setEdit] = useState<boolean>(false);
  const [EditField, setEditField] = useState<string>(data);

  useEffect(() => {
    setEditField(data);
  }, [data]);

  return (
    <td className="edit-table-string">
      <Row noGutters>
        <Col className="colContent">
          {Edit ? <FormControl as="input" value={EditField} onChange={(e) => setEditField(e.target.value)} /> : data}
        </Col>
        <Col className="colButtons">
          {Edit ? (
            <>
              <ConfirmIcon
                onClick={() => {
                  validate(EditField);
                  setEdit(false);
                }}
              />
              <CancelIcon
                onClick={() => {
                  setEdit(false);
                  setEditField(data);
                }}
              />
            </>
          ) : (
            <EditIcon onClick={() => setEdit(true)} />
          )}
        </Col>
      </Row>
    </td>
  );
};

export default StringEditCell;
