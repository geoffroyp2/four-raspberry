import React, { FC } from "react";
import { Table } from "react-bootstrap";

type Props = { children: JSX.Element[] };

const PieceTable: FC<Props> = ({ children }) => {
  return (
    <Table striped bordered hover className="table-sm" variant="dark">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Émail</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};

export default PieceTable;
