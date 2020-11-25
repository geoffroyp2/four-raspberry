import React, { useEffect, useRef, useState } from "react";
import { Col, Overlay, Row, Tooltip } from "react-bootstrap";
import { CirclePicker } from "react-color";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../utils/styles";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphColor, setColor } from "../../../../redux/reducers/graphSlice";
import { editState } from "../../../../redux/reducers/UIControlsSlice";

import { Color } from "../../../../../interfaces/programInterfaces";

const colorToString = (c: Color) => {
  return `rgb(${c.r},${c.g},${c.b})`;
};

const ProgramColor = () => {
  const editMode = useSelector(editState);
  const color = useSelector(selectedGraphColor);
  const dispatch = useDispatch();

  const target = useRef(null);
  const [ShowPicker, setShowPicker] = useState<boolean>(false);
  useEffect(() => {
    if (!editMode) setShowPicker(false);
  }, [editMode]);

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Couleur</Col>
        <Col className={infoMidCol}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 1 1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              if (editMode) setShowPicker(!ShowPicker);
            }}
            ref={target}
            style={{ cursor: `${editMode ? "pointer" : "default"}` }}
          >
            <rect width="1" height="1" rx="0.25" ry="0.25" fill={colorToString(color)} />
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
                  onChange={(c) => dispatch(setColor({ ...c.rgb, a: 0.9 }))}
                />
              </Tooltip>
            )}
          </Overlay>
        </Col>
      </Row>
      {divider}
    </>
  );
};

export default ProgramColor;
