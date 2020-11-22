import React, { useCallback, useRef, useState } from "react";
import { Overlay, Spinner, Tooltip } from "react-bootstrap";
import { CirclePicker } from "react-color";

import { useDispatch, useSelector } from "react-redux";

import db from "../../../../../db/handler";
import { Color } from "../../../../../interfaces/programInterfaces";
import { selectedGraphColor, selectedGraphId, setColor } from "../../../../redux/reducers/graphs/graphSlice";

const colorToString = (c: Color) => {
  return `rgb(${c.r},${c.g},${c.b})`;
};

const ColorPicker = () => {
  const graphColor = useSelector(selectedGraphColor);
  const id = useSelector(selectedGraphId);
  const dispatch = useDispatch();

  const [ColorShown, setColorShown] = useState<Color>(graphColor);
  const [ShowPicker, setShowPicker] = useState<boolean>(false);
  const [PendingState, setPendingState] = useState<boolean>(false);

  const target = useRef(null);

  const handleClick = useCallback(() => {
    if (ShowPicker) {
      setPendingState(true);
      db.updateGraph(id, { color: { ...ColorShown, a: 0.9 } }, (newGraph) => {
        setPendingState(false);
        setShowPicker(false);
        dispatch(setColor(newGraph.color));
      });
    } else {
      setColorShown(graphColor);
      setShowPicker(true);
    }
  }, [ShowPicker, graphColor, ColorShown, id, dispatch]);

  return (
    <>
      <svg
        width="25"
        height="25"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
        ref={target}
        style={{ cursor: "pointer" }}
      >
        <rect
          width="1"
          height="1"
          rx="0.25"
          ry="0.25"
          fill={ShowPicker ? colorToString(ColorShown) : colorToString(graphColor)}
        />
      </svg>
      {PendingState && (
        <Spinner
          style={{ position: "relative", left: -20, top: 2, cursor: "pointer" }}
          as="span"
          animation="border"
          size="sm"
          role="status"
        />
      )}
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
              onChange={(c) => setColorShown(c.rgb)}
            />
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default ColorPicker;
