import { FC } from "react";

const BasicMainCard: FC = ({ children }) => {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div
        className="inline-block min-w-full shadow rounded-lg overflow-hidden border-gray-900"
        style={{
          background: "linear-gradient(180deg, #3f3f46 0%, #36363D 100%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BasicMainCard;
