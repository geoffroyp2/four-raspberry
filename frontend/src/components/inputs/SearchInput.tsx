import { FC, useMemo } from "react";

type Props = {
  id: string;
  placeholder: string;
  color: string;
};

const TextInput: FC<Props> = ({ id, placeholder, color }) => {
  const inputStyle = useMemo(() => {
    const inputShapeAndBorder = "appearance-none rounded-lg flex-1 border shadow-sm ";
    const inputSizeAndAlign = "w-full py-2 px-4 text-base ";
    const inputColor = "bg-white text-gray-700 placeholder-gray-400 border-gray-300 ";
    const inputFocus = `focus:outline-none focus:ring-2 focus:ring-${color}-600 focus:border-transparent `;
    return inputShapeAndBorder + inputSizeAndAlign + inputColor + inputFocus;
  }, [color]);

  return <input type="text" id={id} className={inputStyle} placeholder={placeholder} />;
};

export default TextInput;
