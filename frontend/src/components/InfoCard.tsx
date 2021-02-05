import React from "react";
import { Card } from "react-bootstrap";

type Props = {
  children?: JSX.Element[] | JSX.Element;
};

const InfoCard = ({ children }: Props) => {
  return <Card className="p-2">{children}</Card>;
};

export default InfoCard;
