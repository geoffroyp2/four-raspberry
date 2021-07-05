import React, { FC } from "react";
import { Table } from "react-bootstrap";

type Props = { children: JSX.Element[] | JSX.Element };

const RecordTable: FC<Props> = ({ children }) => {
  return (
    <Table striped bordered hover className="table-sm mb-0" variant="dark">
      <thead>
        <tr>
          <th>Nom</th>
          <th className="goto"></th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};

export default RecordTable;
