import BasicMainCard from "@cards/BasicMainCard";
import { FC } from "react";

type Props = {};

const LoadTable: FC<Props> = ({ children }) => {
  return (
    <BasicMainCard>
      <table className="min-w-full leading-normal">{children}</table>
    </BasicMainCard>
  );
};

export default LoadTable;
