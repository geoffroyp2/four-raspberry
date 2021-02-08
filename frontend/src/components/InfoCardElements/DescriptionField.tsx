import React, { FC, useState } from "react";
import { Formula, Piece, Record, Target } from "@baseTypes/database/GQLResTypes";

import { RootState } from "@store/store";
import { useSelector } from "react-redux";

import "../styles/infoCard.scss";
import { Col, FormControl, Row } from "react-bootstrap";
import EditIcon from "@src/assets/EditIcon";
import CancelIcon from "@src/assets/CancelIcon";
import ConfirmIcon from "@src/assets/ConfirmIcon";

type PosTypes = Formula | Piece | Record | Target;
type Props = {
  data: (state: RootState) => PosTypes;
  validate: (name: PosTypes) => void;
  edit: boolean;
  setEdit: (value: boolean) => void;
  pending: boolean;
};

const DescriptionField: FC<Props> = ({ data, validate, edit, setEdit, pending }) => {
  const currentData = useSelector(data);
  const [EditField, setEditField] = useState<string>(currentData.description!);

  return (
    <Row className="editField descriptionField " noGutters>
      <Col className="colContent">
        <label>Description:</label>
        <span>
          {edit ? (
            <FormControl as="textarea" value={EditField} onChange={(e) => setEditField(e.target.value)} />
          ) : (
            currentData.description || "-"
          )}
        </span>
      </Col>
      <Col className="colButtons">
        {edit ? (
          <>
            <ConfirmIcon
              onClick={() => {
                validate({ description: EditField });
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

export default DescriptionField;