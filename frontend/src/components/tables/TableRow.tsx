import { FC, ReactNode } from "react";

type Props = {
  rowContent: ReactNode[];
  id: number;
  selected?: boolean;
  handleSelect?: () => void;
  disabled?: boolean;
  hoverEffect?: boolean;
};

const TableRow: FC<Props> = ({ rowContent, selected, id, handleSelect, disabled = false, hoverEffect }) => {
  const bgColor = selected ? "blue-500" : "gray-700";
  const hoverColor = selected || !hoverEffect ? "" : "hover:bg-gray-600";
  const cursor = disabled || selected || !handleSelect ? "" : "cursor-pointer";

  return (
    <tr
      onClick={() => {
        if (!disabled && !selected && handleSelect) handleSelect();
      }}
      className={`${cursor} ${hoverColor} bg-${bgColor} `}
    >
      {rowContent.map((text, i) => (
        <TDElement key={`load-table-${id}-${i}`} content={text} />
      ))}
    </tr>
  );
};

export default TableRow;

type TDElementProps = {
  content?: ReactNode;
};

const TDElement: FC<TDElementProps> = ({ content }) => {
  return (
    <td className="px-5 py-2 border-b border-gray-800 text-sm">
      <p className="text-gray-200 whitespace-no-wrap">{content}</p>
    </td>
  );
};
