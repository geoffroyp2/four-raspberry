import React, { FC } from "react";
import { Table } from "react-bootstrap";

type Props = { formulaColumn?: boolean; children: JSX.Element[] | JSX.Element };

const PieceTable: FC<Props> = ({ formulaColumn = true, children }) => {
  return (
    <Table striped bordered hover className="table-sm" variant="dark">
      <thead>
        <tr>
          <th>Nom</th>
          {formulaColumn && <th>Émail</th>}
          <th className="goto"></th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};

export default PieceTable;
