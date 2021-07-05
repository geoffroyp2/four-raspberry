import React, { FC, useRef, useState } from "react";
import { Col, Overlay, Row, Tooltip } from "react-bootstrap";
import { CirclePicker } from "react-color";

import { useDispatch } from "react-redux";
import { Color, Record, Target } from "@baseTypes/database/GQLResTypes";
import "../styles/infoCard.scss";

type PosTypes = Record | Target;
type Props = {
  id: number;
  color: Color;
  validate: (id: number, newData: PosTypes) => void;
  setColor: (data: { color: Color }) => void;
  pending: boolean;
};

const ColorField: FC<Props> = ({ id, color, validate, setColor, pending }) => {
  const dispatch = useDispatch();
  const target = useRef(null);
  const [ShowPicker, setShowPicker] = useState<boolean>(false);

  const handleSVGClick = () => {
    if (!ShowPicker) setShowPicker(true);
    else {
      validate(id, { color });
      setShowPicker(false);
    }
  };

  return (
    <Row className="editField colorField" noGutters>
      <Col className="colContent">
        <label>Couleur :</label>
        <svg
          width="25"
          height="25"
          viewBox="0 0 1 1"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleSVGClick}
          ref={target}
          style={{ cursor: "pointer" }}
        >
          <rect width="1" height="1" rx="0.25" ry="0.25" fill={`rgb(${color.r},${color.g},${color.b})`} />
        </svg>
        <Overlay target={target.current} show={ShowPicker} placement="right">
          {(props) => (
            <Tooltip id="color-overlay" {...props}>
              <CirclePicker
                width="168px"
                colors={[
                  "#ff1313",
                  "#ff4010",
                  "#e91e63",
                  "#9c27b0",
                  "#3f10b5",
                  "#0370f4",
                  "#00bcd4",
                  "#007488",
                  "#3caf30",
                  "#cddc39",
                  "#ffc107",
                  "#989898",
                ]}
                onChange={(c) => dispatch(setColor({ color: { ...c.rgb, a: 1 } }))}
              />
            </Tooltip>
          )}
        </Overlay>
      </Col>
    </Row>
  );
};

export default ColorField;
