import React, { FC, useState } from "react";

//https://www.flaticon.com/free-icon/delete_271207

type Props = {
  size?: number;
  onClick: (() => void) | ((event: React.SyntheticEvent<Element, Event>) => void);
};

const defaultColor = "#C0C0C0";
const hoverColor = "#FFFFFF";

const CollapseIcon: FC<Props> = ({ size = 26, onClick }) => {
  const [Color, setColor] = useState<string>(defaultColor);

  return (
    <svg
      onClick={onClick}
      onMouseEnter={() => setColor(hoverColor)}
      onMouseLeave={() => setColor(defaultColor)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 492 492"
      width={size}
      height={size}
      fill={Color}
    >
      <path d="M465.064 207.562H26.908C12.076 207.562 0 219.698 0 234.53v22.804c0 14.832 12.072 27.104 26.908 27.104h438.156c14.84 0 26.936-12.272 26.936-27.104V234.53c0-14.832-12.096-26.968-26.936-26.968z" />
    </svg>
  );
};

export default CollapseIcon;
