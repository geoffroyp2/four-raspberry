import { FC, useMemo } from "react";

type Props = {
  color: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const BasicButton: FC<Props> = ({ color, onClick, type, children }) => {
  const buttonStyle = useMemo(() => {
    const buttonShapeAndBorder = "rounded-lg shadow-md ";
    const buttonSizeAndAlign = "flex items-center flex-shrink-0 px-4 py-2 text-base ";
    const buttonColorAndFont = `font-semibold text-white bg-${color}-600 `;
    const buttonFocusAndHover = `hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 focus:ring-offset-${color}-200`;
    return buttonShapeAndBorder + buttonSizeAndAlign + buttonColorAndFont + buttonFocusAndHover;
  }, [color]);

  return (
    <button className={buttonStyle + ""} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default BasicButton;
