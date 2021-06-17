import { FC } from "react";

const BasicMainCard: FC = ({ children }) => {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-gray-700 border-gray-900">{children}</div>
    </div>
  );
};

export default BasicMainCard;
