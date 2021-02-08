import React, { FC } from "react";
import { Card } from "react-bootstrap";

type Props = {
  className?: string;
  children?: JSX.Element[] | JSX.Element | false;
};

const EditorCard: FC<Props> = ({ className, children }) => {
  return <Card className={`p-2 m-2 shadow ${className || ""}`}>{children}</Card>;
};

export default EditorCard;
