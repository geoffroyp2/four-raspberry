import React from "react";
import { Table } from "react-bootstrap";

import ScrollZone from "@UITabs/sharedComponents/ScrollZone";
import SortSVG from "./SortSVG";

type LoadTableProps = {
  header: JSX.Element;
  body: JSX.Element[];
};

export const LoadTableComponent = ({ header, body }: LoadTableProps) => {
  return (
    <ScrollZone
      content={
        <Table size="sm" variant="dark" striped bordered hover className="mb-0">
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody>{body}</tbody>
        </Table>
      }
    />
  );
};

type LTHCProps = {
  id: string;
  label: string;
  width: number;
  sort: {
    param: string;
    direction: boolean;
  };
  onClick: (e: any) => void;
};

export const LoadTableHeaderCell = ({ id, label, width, sort, onClick }: LTHCProps) => {
  return (
    <th id={id} onClick={onClick} style={{ width: `${width}%`, pointerEvents: "auto" }}>
      <span className="ml-1 mr-2" style={{ pointerEvents: "none" }}>
        {label}
      </span>
      {sort.param === id && (
        <span className="ml-2 mr-1 float-right" style={{ pointerEvents: "none" }}>
          <SortSVG direction={sort.direction} />
        </span>
      )}
    </th>
  );
};
