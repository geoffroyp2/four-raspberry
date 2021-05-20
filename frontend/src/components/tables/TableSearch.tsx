import { FC, FormEvent } from "react";

type Props = {
  handleSubmit: (fieldValue: string) => void;
};

// Tailwind themes
const colorTheme = "blue";

const inputShapeAndBorder = "appearance-none rounded-lg flex-1 border shadow-sm ";
const inputSizeAndAlign = "w-full py-2 px-4 text-base ";
const inputColor = "bg-white text-gray-700 placeholder-gray-400 border-gray-300 ";
const inputFocus = `focus:outline-none focus:ring-2 focus:ring-${colorTheme}-600 focus:border-transparent `;
const inputStyle = inputShapeAndBorder + inputSizeAndAlign + inputColor + inputFocus;

const buttonShapeAndBorder = "rounded-lg shadow-md ";
const buttonSizeAndAlign = "flex-shrink-0 px-4 py-2 text-base ";
const buttonColorAndFont = `font-semibold text-white bg-${colorTheme}-600 `;
const buttonFocusAndHover = `hover:bg-${colorTheme}-700 focus:outline-none focus:ring-2 focus:ring-${colorTheme}-500 focus:ring-offset-2 focus:ring-offset-${colorTheme}-200`;
const buttonStyle = buttonShapeAndBorder + buttonSizeAndAlign + buttonColorAndFont + buttonFocusAndHover;

const TableSearch: FC<Props> = ({ handleSubmit }) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = (e.target as HTMLFormElement).elements;
    const value = (elements.namedItem("load-table-search") as HTMLInputElement)?.value;

    if (value !== undefined) {
      handleSubmit(value);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm space-x-3">
      <div className="relative ">
        <input type="text" id="load-table-search" className={inputStyle} placeholder="Nom de la courbe" />
      </div>
      <button className={buttonStyle} type="submit">
        Filtrer
      </button>
    </form>
  );
};

export default TableSearch;
