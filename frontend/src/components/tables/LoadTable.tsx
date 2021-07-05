import { FC } from "react";
import BasicMainCard from "@components/cards/BasicMainCard";

type Props = {};

const LoadTable: FC<Props> = ({ children }) => {
  return (
    <BasicMainCard>
      <table className="min-w-full leading-normal">{children}</table>
    </BasicMainCard>
  );
};

export default LoadTable;
