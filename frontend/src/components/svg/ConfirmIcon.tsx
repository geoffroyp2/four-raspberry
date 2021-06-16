import { FC, useMemo, useState } from "react";

//https://www.flaticon.com/free-icon/tick-mark_3388538

type Props = {
  size?: number;
  onClick?: () => void;
};

const defaultColor = "#20C020";
const hoverColor = "#30D030";

const ConfirmIcon: FC<Props> = ({ size = 20, onClick }) => {
  const [Color, setColor] = useState<string>(defaultColor);

  const onClickProps = useMemo(() => {
    if (onClick)
      return {
        onClick,
        onMouseEnter: () => setColor(hoverColor),
        onMouseLeave: () => setColor(defaultColor),
        className: "cursor-pointer",
      };
    return {};
  }, [onClick]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 408.576 408.576"
      width={size}
      height={size}
      fill={Color}
      {...onClickProps}
    >
      <path d="M204.288 0C91.648 0 0 91.648 0 204.288s91.648 204.288 204.288 204.288 204.288-91.648 204.288-204.288S316.928 0 204.288 0zm114.176 150.528l-130.56 129.536c-7.68 7.68-19.968 8.192-28.16.512L90.624 217.6c-8.192-7.68-8.704-20.48-1.536-28.672 7.68-8.192 20.48-8.704 28.672-1.024l54.784 50.176L289.28 121.344c8.192-8.192 20.992-8.192 29.184 0s8.192 20.992 0 29.184z" />
    </svg>
  );
};

export default ConfirmIcon;
