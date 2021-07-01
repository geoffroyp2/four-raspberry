import { FC } from "react";

type Props = {
  columnNames: string[];
  textCenter?: boolean;
};

const TableHeader: FC<Props> = ({ columnNames, textCenter }) => {
  return (
    <thead>
      <tr>
        {columnNames.map((name, i) => (
          <THElement name={name} key={`load-table-header-${i}`} textCenter={textCenter} />
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

type THElementProps = {
  name: string;
  textCenter?: boolean;
};

const THElement: FC<THElementProps> = ({ name, textCenter }) => {
  return (
    <th
      scope="col"
      className={`px-5 py-2 bg-gray-500 border-b border-gray-800 text-gray-100 text-${
        textCenter ? "center" : "left"
      } text-sm uppercase font-bold`}
    >
      {name}
    </th>
  );
};
