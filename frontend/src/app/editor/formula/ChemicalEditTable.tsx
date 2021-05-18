import React, { FC } from "react";
import { Button, Col, FormControl, InputGroup, Row, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectFormulaTempIngredients, setFormulaTempIngredients } from "./_state/formulaDataSlice";
import { selectChemicalLoadList } from "./_state/chemicalDataSlice";
import { selectChemicalLoadRowSelected } from "./_state/chemicalDisplaySlice";
import { setLoadTable } from "@editor/_state/editorSlice";

import ChemicalLoadTable from "./ChemicalLoadTable";
import CollapsableZone from "@components/CollapsableZone";

const ChemicalEditTable: FC = () => {
  const dispatch = useDispatch();
  const currentIngredients = useSelector(selectFormulaTempIngredients);
  const chemicalRowSelected = useSelector(selectChemicalLoadRowSelected);
  const chemicalLoadList = useSelector(selectChemicalLoadList);

  const handleSelect = () => {
    dispatch(
      setFormulaTempIngredients([
        ...currentIngredients,
        {
          chemical: chemicalLoadList[chemicalRowSelected - 1],
          amount: 0,
        },
      ])
    );
    dispatch(setLoadTable({ chemical: false }));
  };

  const handleCancel = () => {
    dispatch(setLoadTable({ chemical: false }));
  };

  const getTableBody = (): JSX.Element[] => {
    const rows = currentIngredients.map((chem, idx) => (
      <tr key={`chemRow${idx}`}>
        <td>
          <CollapsableZone header={<div>{chem.chemical?.name || "-"}</div>} buttonSize={14}>
            <Row>
              <Col>{chem.chemical?.chemicalName || "-"}</Col>
            </Row>
            <Row>
              <Col>{chem.chemical?.currentVersion || "-"}</Col>
            </Row>
          </CollapsableZone>
        </td>
        <td>
          <InputGroup>
            <FormControl type="number" defaultValue={chem.amount ?? 0} />
            <InputGroup.Prepend>
              <InputGroup.Text>g</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
          {/* <input type="number" defaultValue={chem.amount ?? 0}></input> */}
          {/* {`${chem.amount?.toFixed(2)}g` || "-"} */}
        </td>
        <td>
          <Button className="btn-danger">X</Button>
        </td>
      </tr>
    ));

    rows.push(
      <tr>
        <td colSpan={3}>
          <Button
            className="float-right btn-success"
            onClick={() => {
              dispatch(setLoadTable({ chemical: true }));
            }}
          >
            Ajouter
          </Button>
        </td>
      </tr>
    );
    return rows;
  };

  return (
    <>
      <ChemicalLoadTable select={handleSelect} cancel={handleCancel} />
      <Table striped bordered className="table-sm" variant="dark">
        <thead>
          <tr>
            <th>Element chimique</th>
            <th>Quantité</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{getTableBody()}</tbody>
      </Table>
    </>
  );
};

export default ChemicalEditTable;
