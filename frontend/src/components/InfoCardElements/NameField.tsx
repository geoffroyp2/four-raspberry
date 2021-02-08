import React, { FC, useState } from "react";
import { Chemical, Formula, Piece, Record, Target } from "@baseTypes/database/GQLResTypes";

import { RootState } from "@store/store";
import { useSelector } from "react-redux";

import "../styles/infoCard.scss";
import { Col, FormControl, Row } from "react-bootstrap";
import EditIcon from "@src/assets/EditIcon";
import CancelIcon from "@src/assets/CancelIcon";
import ConfirmIcon from "@src/assets/ConfirmIcon";

type PosTypes = Chemical | Formula | Piece | Record | Target;
type Props = {
  data: (state: RootState) => PosTypes;
  validate: (id: number, newData: PosTypes) => void;
  edit: boolean;
  setEdit: (value: boolean) => void;
  pending: boolean;
};

const NameField: FC<Props> = ({ data, validate, edit, setEdit, pending }) => {
  const currentData = useSelector(data);
  const [EditField, setEditField] = useState<string>(currentData.name!);

  return (
    <Row className="editField nameField" noGutters>
      <Col className="colContent">
        <label>Name:</label>
        <span>
          {edit ? (
            <FormControl as="input" value={EditField} onChange={(e) => setEditField(e.target.value)} />
          ) : (
            currentData.name || "-"
          )}
        </span>
      </Col>
      <Col className="colButtons">
        {edit ? (
          <>
            <ConfirmIcon
              onClick={() => {
                validate(currentData.id || 0, { name: EditField });
                setEdit(false);
              }}
            />
            <CancelIcon onClick={() => setEdit(false)} />
          </>
        ) : (
          <EditIcon onClick={() => setEdit(true)} />
        )}
      </Col>
    </Row>
  );
};

export default NameField;
