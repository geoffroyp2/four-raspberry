import React, { FC, useState, useEffect } from "react";
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
  validate: (name: PosTypes) => void;
  edit: boolean;
  setEdit: (value: boolean) => void;
  pending: boolean;
};

const NameField: FC<Props> = ({ data, validate, edit, setEdit, pending }) => {
  const currentData = useSelector(data);
  const [EditField, setEditField] = useState<string>(currentData.name!);

  return (
    <Row className="NameField" noGutters>
      <Col className="colContent" sm={10} xs={9}>
        <label>Name:</label>
        <span>
          {edit ? (
            <FormControl as="input" value={EditField} onChange={(e) => setEditField(e.target.value)} />
          ) : (
            currentData.name || "-"
          )}
        </span>
      </Col>
      <Col className="colButtons" sm={2} xs={3}>
        {edit ? (
          <>
            <ConfirmIcon
              onClick={() => {
                validate({ name: EditField });
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
