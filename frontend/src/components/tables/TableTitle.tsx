import { FC, ReactNode } from "react";
import TableSearch from "./TableSearch";

type Props = {
  title?: string;
  tabs?: ReactNode[];
  handleSubmit: (fieldValue: string) => void;
};

const TableTitle: FC<Props> = ({ title, handleSubmit, tabs }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:mb-0 sm:justify-between w-full items-center">
      {tabs ? (
        <ul className="flex cursor-pointer gap-2">{tabs}</ul>
      ) : (
        <div className="text-end">
          <h2 className="text-2xl leading-tight">{title}</h2>
        </div>
      )}
      <TableSearch handleSubmit={handleSubmit} />
    </div>
  );
};

export default TableTitle;

type TableTitleProps = {
  title: string;
  onClick: () => void;
  selected: boolean;
};

export const TableTitleTab: FC<TableTitleProps> = ({ title, selected, onClick }) => {
  const bgColor = selected ? "bg-blue-500" : "bg-gray-600";
  return (
    <li className={`py-2 px-4 ${bgColor} text-gray-300 rounded-lg text-center shadow-lg`} onClick={onClick}>
      {title}
    </li>
  );
};
