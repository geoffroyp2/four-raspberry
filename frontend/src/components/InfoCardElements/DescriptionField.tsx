import React, { FC, useState } from "react";
import { Formula, Piece, Record, Target } from "@baseTypes/database/GQLResTypes";

import { RootState } from "@app/store";
import { useSelector } from "react-redux";

import "../styles/infoCard.scss";
import { Col, FormControl, Row } from "react-bootstrap";
import EditIcon from "@src/assets/EditIcon";
import CancelIcon from "@src/assets/CancelIcon";
import ConfirmIcon from "@src/assets/ConfirmIcon";

type PosTypes = Formula | Piece | Record | Target;
type Props = {
  data: (state: RootState) => PosTypes;
  validate: (id: number, newData: PosTypes) => void;
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
                validate(currentData.id || 0, { description: EditField });
                setEdit(false);
              }}
            />
            <CancelIcon
              onClick={() => {
                setEdit(false);
                setEditField(currentData.name!);
              }}
            />
          </>
        ) : (
          <EditIcon onClick={() => setEdit(true)} />
        )}
      </Col>
    </Row>
  );
};

export default DescriptionField;
