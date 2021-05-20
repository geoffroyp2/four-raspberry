import { FC } from "react";

type Props = {
  columnNames: string[];
};

const TableHeader: FC<Props> = ({ columnNames }) => {
  return (
    <thead>
      <tr>
        {columnNames.map((name, i) => (
          <THElement name={name} key={`load-table-header-${i}`} />
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

type THElementProps = {
  name: string;
};

const THElement: FC<THElementProps> = ({ name }) => {
  return (
    <th
      scope="col"
      className="px-5 py-2 bg-gray-500 border-b border-gray-800 text-gray-100 text-left text-sm uppercase font-bold"
    >
      {name}
    </th>
  );
};
