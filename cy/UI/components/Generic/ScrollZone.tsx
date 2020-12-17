import React from "react";
import Scrollbars from "react-custom-scrollbars";

type Props = {
  content: JSX.Element;
};

const ScrollZone = ({ content }: Props) => {
  return (
    <Scrollbars
      className="rounded"
      style={{ height: "100%", border: "solid 1px rgba(10,10,10,0.8)", backgroundColor: "#232323", overflow: "hidden" }}
    >
      {content}
    </Scrollbars>
  );
};

export default ScrollZone;
