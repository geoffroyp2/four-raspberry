import React, { useCallback, useRef, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap";

import { CirclePicker } from "react-color";

import program from "../../../programLogic/program";
import graphEditor from "../../../programLogic/graphEdit";
import { Color } from "../../../interfaces/programInterfaces";

type Props = {
  id: string;
};

const ColorPicker = ({ id }: Props) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [color, setColor] = useState<Color>(program.graphs[id].color);

  const target = useRef(null);

  const handleClick = useCallback(() => {
    if (showPicker) {
      graphEditor.editGraph(id, { color: { ...color, a: 0.9 } }, (newGraph) => {
        setColor(newGraph.color);
      });
    }
    setShowPicker(!showPicker);
  }, [showPicker, color, id]);

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
          fill={`rgb(${color.r},${color.g},${color.b})`}
        />
      </svg>
      <Overlay target={target.current} show={showPicker} placement="right">
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
              onChange={(c) => setColor(c.rgb)}
            />
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default ColorPicker;
