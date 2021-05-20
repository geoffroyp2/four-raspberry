import { FC } from "react";
import TableSearch from "./TableSearch";

type Props = {
  title: string;
  handleSubmit: (fieldValue: string) => void;
};

const TableTitle: FC<Props> = ({ title, handleSubmit }) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:mb-0 sm:justify-between w-full">
      <h2 className="text-2xl leading-tight">{title}</h2>
      <div className="text-end">
        <TableSearch handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default TableTitle;
