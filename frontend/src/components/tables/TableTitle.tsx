import { FC } from "react";
import TableSearch from "./TableSearch";

type Props = {
  title: string;
  handleSubmit: (fieldValue: string) => void;
};

const TableTitle: FC<Props> = ({ title, handleSubmit }) => {
  return (
    <div className="flex flex-row mb-0 justify-between w-full">
      <h2 className="text-2xl leading-tight">{title}</h2>
      <div className="text-end">
        <TableSearch handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default TableTitle;
