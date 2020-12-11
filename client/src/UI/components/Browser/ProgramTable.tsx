import React, { useCallback, useEffect } from "react";
import { Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraph, allGraphs } from "@redux/graphSlice";
import { loadTableProps, loadTableRowSelected, loadTableSort, setRowSelected, setTableSort } from "@redux/UIControlsSlice";

import { dateToDisplayString } from "@UIutils/dateFormatting";
import { graphFilter, graphSort } from "./utils/graphTable";

import SortSVG from "./utils/sortSVG";
import ScrollZone from "../Generic/ScrollZone";

const ProgramTable = () => {
  const dispatch = useDispatch();

  const graphs = useSelector(allGraphs);
  const currentGraph = useSelector(selectedGraph);
  const { filter } = useSelector(loadTableProps);
  const { sortParam, sortDirection } = useSelector(loadTableSort);
  const rowSelected = useSelector(loadTableRowSelected);

  useEffect(() => {
    if (rowSelected.length === 0) dispatch(setRowSelected(currentGraph._id));
  }, [dispatch, rowSelected, currentGraph]);

  const handleSort = useCallback(
    (e) => {
      if (e.target.id === sortParam) dispatch(setTableSort({ sortParam: e.target.id, sortDirection: !sortDirection }));
      else dispatch(setTableSort({ sortParam: e.target.id, sortDirection: true }));
    },
    [dispatch, sortDirection, sortParam]
  );

  return (
    <ScrollZone
      content={
        <Table size="sm" variant="dark" striped bordered hover className="mb-0">
          <thead>
            <tr>
              <TableHeader id={"name"} label={"Nom"} width={25} onClick={handleSort} />
              <TableHeader id={"type"} label={"Type"} width={10} onClick={handleSort} />
              <TableHeader id={"ref"} label={"Courbe de Référence"} width={25} onClick={handleSort} />
              <TableHeader id={"date"} label={"Date de cuisson"} width={20} onClick={handleSort} />
              <TableHeader id={"lastUpdated"} label={"Dernière modification"} width={20} onClick={handleSort} />
            </tr>
          </thead>
          <tbody>
            {Object.entries(graphs)
              .filter(([key, value]) => {
                return filter ? currentGraph._id !== key && graphFilter(value, filter) : true;
              })
              .sort((a, b) => graphSort(a, b, sortParam, sortDirection))
              .map(([key, value]) => {
                return (
                  <tr
                    onClick={(e) => dispatch(setRowSelected((e.target as HTMLTableRowElement).id))}
                    id={key}
                    key={key}
                    className={key === rowSelected ? "table-primary" : ""}
                  >
                    <td id={key}>{value.name}</td>
                    <td id={key}>{value.graphType ? "Modèle" : "Cuisson"}</td>
                    <td id={key}>{value.graphRef ? graphs[value.graphRef].name : "-"}</td>
                    <td id={key}>{dateToDisplayString(value.date, false)}</td>
                    <td id={key}>{dateToDisplayString(value.lastUpdated, true)}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      }
    />
  );
};

export default ProgramTable;

type THProps = {
  id: string;
  label: string;
  width: number;
  onClick: (e: any) => void;
};

const TableHeader = ({ id, label, width, onClick }: THProps) => {
  const { sortParam, sortDirection } = useSelector(loadTableSort);
  return (
    <th id={id} onClick={onClick} style={{ width: `${width}%`, pointerEvents: "auto" }}>
      <span className="ml-1 mr-2" style={{ pointerEvents: "none" }}>
        {label}
      </span>
      {sortParam === id && (
        <span className="ml-2 mr-1 float-right" style={{ pointerEvents: "none" }}>
          <SortSVG direction={sortDirection} />
        </span>
      )}
    </th>
  );
};
