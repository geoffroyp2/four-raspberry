import { FC } from "react";

type Props = {};

const LoadTable: FC<Props> = ({ children }) => {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">{children}</table>
      </div>
    </div>
  );
};

export default LoadTable;
