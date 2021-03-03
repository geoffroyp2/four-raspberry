import React, { FC } from "react";
import { Col, Row, Table } from "react-bootstrap";

import { useSelector } from "react-redux";
import { selectFormulaData } from "./_state/formulaDataSlice";

import CollapsableZone from "@components/CollapsableZone";

const ChemicalEditTable: FC = () => {
  const currentFormula = useSelector(selectFormulaData);

  const getTableBody = (): JSX.Element[] => {
    if (!currentFormula.ingredients) return [];
    return currentFormula.ingredients.map((chem, idx) => (
      <tr key={`chemRow${idx}`}>
        <td>
          <CollapsableZone header={<div>{chem.chemical?.name || "-"}</div>} buttonSize={14}>
            <Row>
              <Col>{chem.chemical?.chemicalName || "-"}</Col>
            </Row>
            <Row>
              <Col>{chem.chemical?.density || "-"}</Col>
            </Row>
          </CollapsableZone>
        </td>
        <td>{`${chem.amount?.toFixed(2)}%` || "-"}</td>
      </tr>
    ));
  };

  return (
    <Table striped bordered className="table-sm" variant="dark">
      <thead>
        <tr>
          <th>Element chimique</th>
          <th>Quantité</th>
        </tr>
      </thead>
      <tbody>{getTableBody()}</tbody>
    </Table>
  );
};

export default ChemicalEditTable;
