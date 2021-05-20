import { FC } from "react";

type Props = {
  rowContent: string[];
  selected: boolean;
  id: number;
  handleSelect: () => void;
};

const TableRow: FC<Props> = ({ rowContent, selected, id, handleSelect }) => {
  const bgColor = selected ? "blue-500" : "gray-700";
  const hoverColor = selected ? "blue-400" : "gray-600";

  return (
    <tr onClick={handleSelect} className={`cursor-pointer hover:bg-${hoverColor} bg-${bgColor} `}>
      {rowContent.map((text, i) => (
        <TDElement key={`load-table-${id}-${i}`} text={text} selected={selected} />
      ))}
    </tr>
  );
};

export default TableRow;

type TDElementProps = {
  text?: string;
  selected: boolean;
};

const TDElement: FC<TDElementProps> = ({ text }) => {
  return (
    <td className={`px-5 py-2 border-b border-gray-800 text-sm`}>
      <p className="text-gray-200 whitespace-no-wrap">{text}</p>
    </td>
  );
};
