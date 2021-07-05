import React, { FC, useContext } from "react";
import CollapseIcon from "@src/assets/CollapseIcon";
import ExpandIcon from "@src/assets/ExpandIcon";
import { AccordionContext, useAccordionToggle } from "react-bootstrap";

type Props = {
  eventKey: string;
  size?: number;
};

const CollapseButton: FC<Props> = ({ eventKey, size }) => {
  const currentEventKey = useContext(AccordionContext);
  const onClick = useAccordionToggle(eventKey);

  return currentEventKey === eventKey ? (
    <CollapseIcon onClick={onClick} size={size} />
  ) : (
    <ExpandIcon onClick={onClick} size={size} />
  );
};

export default CollapseButton;
