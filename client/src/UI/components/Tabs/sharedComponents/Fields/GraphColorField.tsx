import React, { useEffect, useRef, useState } from "react";
import { Col, Overlay, Row, Tooltip } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../styles/InfoZoneStyles";
import { CirclePicker } from "react-color";

import { useDispatch, useSelector } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "@src/redux/store";

import { Color } from "@sharedTypes/dbModelTypes";

type Props = {
  editSelector: (state: RootState) => boolean;
  valueSelector: (state: RootState) => Color;
  changeHandler: ActionCreatorWithPayload<Color, string>;
};

const GraphColorField = ({ editSelector, valueSelector, changeHandler }: Props) => {
  const dispatch = useDispatch();
  const edit = useSelector(editSelector);
  const color = useSelector(valueSelector);

  const target = useRef(null);
  const [ShowPicker, setShowPicker] = useState<boolean>(false);

  useEffect(() => {
    if (!edit) setShowPicker(false);
  }, [edit]);

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
              if (edit) setShowPicker(!ShowPicker);
            }}
            ref={target}
            style={{ cursor: `${edit ? "pointer" : "default"}` }}
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
                  onChange={(c) => dispatch(changeHandler({ ...c.rgb, a: 0.9 }))}
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

export default GraphColorField;
