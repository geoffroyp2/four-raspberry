import { FC } from "react";

type ColumnType = {
  name: string;
  onClick?: () => void;
  isSortParam?: boolean;
  sortDirection?: "ASC" | "DESC";
};

type Props = {
  columns: ColumnType[];
  textCenter?: boolean;
};

const TableHeader: FC<Props> = ({ columns, textCenter }) => {
  return (
    <thead>
      <tr>
        {columns.map((col, i) => (
          <THElement column={col} key={`load-table-header-${i}`} textCenter={textCenter} />
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

type THElementProps = {
  textCenter?: boolean;
  column: ColumnType;
};

const THElement: FC<THElementProps> = ({ column, textCenter }) => {
  return (
    <th
      scope="col"
      className={`px-5 py-2 bg-gray-500 border-b border-gray-800 text-gray-100 text-${
        textCenter ? "center" : "left"
      } text-sm uppercase font-bold`}
    >
      {column.name}
    </th>
  );
};
