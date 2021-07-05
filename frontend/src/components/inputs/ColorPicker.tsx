import { Color } from "@app/_types/dbTypes";
import { FC, useState } from "react";

const colorToString = (color: Color) => {
  const R = color.r.toString(16).padStart(2, "0");
  const G = color.g.toString(16).padStart(2, "0");
  const B = color.b.toString(16).padStart(2, "0");
  return `#${R}${G}${B}`;
};

const stringToColor = (color: string) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  return { r, g, b, a: 1 };
};

const colorChoices: string[] = [
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
];

type Props = {
  value: Color;
  onChange: (value: Color) => void;
};

const ColorPicker: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="p-2 grid grid-cols-4 grid-rows-3 gap-1 bg-gray-800 my-1 rounded-xl shadow-xl">
      {colorChoices.map((c, i) => (
        <ColorCircle
          key={`circle-${i}`}
          color={c}
          selected={colorToString(value) === c}
          onClick={() => onChange(stringToColor(c))}
        />
      ))}
    </div>
  );
};

export default ColorPicker;

type CircleProps = {
  color: string;
  selected: boolean;
  onClick: () => void;
};

const ColorCircle: FC<CircleProps> = ({ color, selected, onClick }) => {
  const [Hover, setHover] = useState<boolean>(false);
  return (
    <div style={{ width: 32, height: 32 }} className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1 1"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`transition-all duration-75 border-${selected || Hover ? 0 : 2} border-transparent cursor-pointer`}
        onClick={() => onClick()}
      >
        <circle cx="0.5" cy="0.5" r="0.5" fill={selected ? "#111111" : color} />
        <circle cx="0.5" cy="0.5" r="0.40" fill={color} />
      </svg>
    </div>
  );
};
