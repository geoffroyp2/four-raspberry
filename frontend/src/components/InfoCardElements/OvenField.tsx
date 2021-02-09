import React, { FC } from "react";
import { Target } from "@baseTypes/database/GQLResTypes";

import { RootState } from "@app/store";
import { useSelector } from "react-redux";

import "../styles/infoCard.scss";
import { Col, FormControl, Row } from "react-bootstrap";

type Props = {
  data: (state: RootState) => Target;
  validate: (id: number, newData: Target) => void;
  pending: boolean;
};

const OvenField: FC<Props> = ({ data, validate, pending }) => {
  const currentData = useSelector(data);

  return (
    <Row className="editField ovenField" noGutters>
      <Col className="colContent">
        <label>Four:</label>
        <FormControl
          custom
          as="select"
          value={currentData.oven}
          onChange={(e) => {
            if (e.target.value === "gaz" || e.target.value === "electrique")
              validate(currentData.id || 0, { oven: e.target.value });
          }}
        >
          <option value="gaz">gaz</option>
          <option value="electrique">électrique</option>
        </FormControl>
      </Col>
    </Row>
  );
};

export default OvenField;
