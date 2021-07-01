import { FC } from "react";

type Props = {
  className?: string;
};

namespace PointEditTable {
  export const Table: FC = ({ children }) => {
    return <table className="min-w-full leading-normal table-auto">{children}</table>;
  };

  export const Row: FC = ({ children }) => {
    return <tr className="">{children}</tr>;
  };

  export const RowElement: FC<Props> = ({ children, className }) => {
    return <td className={`border-b border-gray-800 text-sm whitespace-no-wrap ${className}`}>{children}</td>;
  };
}

export default PointEditTable;
