import { FC } from "react";
import BasicMainCard from "./BasicMainCard";

type Props = {};

const InfosCard: FC<Props> = ({ children }) => {
  return <BasicMainCard>{children}</BasicMainCard>;
};

export default InfosCard;
