import React, { FC, useState } from "react";

//https://www.flaticon.com/free-icon/down-arrow_271210

type Props = {
  size?: number;
  onClick: (() => void) | ((event: React.SyntheticEvent<Element, Event>) => void);
};

const defaultColor = "#C0C0C0";
const hoverColor = "#FFFFFF";

const ExpandIcon: FC<Props> = ({ size = 26, onClick }) => {
  const [Color, setColor] = useState<string>(defaultColor);

  return (
    <svg
      onClick={onClick}
      onMouseEnter={() => setColor(hoverColor)}
      onMouseLeave={() => setColor(defaultColor)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 491.996 491.996"
      width={size}
      height={size}
      fill={Color}
    >
      <path d="M484.132 124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86-7.208 0-13.964 2.792-19.036 7.86l-183.84 183.848L62.056 108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968 2.788-19.036 7.856l-16.12 16.128c-10.496 10.488-10.496 27.572 0 38.06l219.136 219.924c5.064 5.064 11.812 8.632 19.084 8.632h.084c7.212 0 13.96-3.572 19.024-8.632l218.932-219.328c5.072-5.064 7.856-12.016 7.864-19.224 0-7.212-2.792-14.068-7.864-19.128z" />
    </svg>
  );
};

export default ExpandIcon;