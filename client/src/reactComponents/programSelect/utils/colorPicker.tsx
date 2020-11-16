import React, { useRef, useState } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import { CirclePicker } from "react-color";
import { Color } from "../../../interfaces/programInterfaces";
import program from "../../../program-logic/program";

type Props = {
  id: string;
  onChange: () => void;
};

const ColorPicker = ({ id, onChange }: Props) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [color, setColor] = useState<Color>(program.graphs[id].color);
  const target = useRef(null);

  return (
    <>
      <svg
        width="25"
        height="25"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setShowPicker(!showPicker)}
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
            {/* <Button className="btn-success">V</Button> */}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default ColorPicker;
