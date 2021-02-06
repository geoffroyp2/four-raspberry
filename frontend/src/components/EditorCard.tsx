import React, { FC } from "react";
import { Card } from "react-bootstrap";

type Props = {
  children?: JSX.Element[] | JSX.Element;
};

const EditorCard: FC<Props> = ({ children }) => {
  return <Card className="p-2 m-2 shadow">{children}</Card>;
};

export default EditorCard;
