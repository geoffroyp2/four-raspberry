import { FC, useMemo } from "react";

type Props = {
  color: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const BasicButton: FC<Props> = ({ color, onClick, type, children, disabled = false }) => {
  const buttonStyle = useMemo(() => {
    const shape = "rounded-lg shadow-md ";
    const flex = "flex items-center flex-shrink-0 px-4 py-2 text-base ";
    const text = "font-semibold text-white ";
    const bgColor = disabled ? "bg-gray-500 " : `bg-${color}-600 hover:bg-${color}-700 `;
    const focus = `focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 focus:ring-offset-${color}-200 `;
    const pointer = disabled ? "cursor-default " : " ";
    return shape + flex + text + bgColor + focus + pointer;
  }, [color, disabled]);

  return (
    <button className={buttonStyle} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default BasicButton;
