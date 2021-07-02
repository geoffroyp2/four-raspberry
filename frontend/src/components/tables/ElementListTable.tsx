import { FC } from "react";
import BasicMainCard from "@components/cards/BasicMainCard";

const ElementListTable: FC = ({ children }) => {
  return (
    <BasicMainCard>
      <table className="min-w-full leading-normal">{children}</table>
    </BasicMainCard>
  );
};

export default ElementListTable;
