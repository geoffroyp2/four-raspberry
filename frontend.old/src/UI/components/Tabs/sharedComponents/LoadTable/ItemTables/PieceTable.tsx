import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { dbDataPiece } from "@redux/dataReducers/dbDataSlice";
import { CurrentPieceID } from "@redux/dataReducers/pieceSlice";
import {
  LoadTableRowSelected,
  LoadTableSort,
  setLoadTableRowSelected,
  setLoadTableSort,
} from "@redux/displayStateReducers/generalDisplaySlice";

import { LoadTableComponent, LoadTableHeaderCell } from "@UITabs/sharedComponents/LoadTable/Components/LoadTableComponent";

import { pieceLoadTableSort } from "@UIutils/loadTableFunctions";
import { dateToDisplayString } from "@UIutils/dateFormat";

const PieceTable = () => {
  const dispatch = useDispatch();

  const tableSort = useSelector(LoadTableSort);
  const rowSelected = useSelector(LoadTableRowSelected);

  const currentPieceID = useSelector(CurrentPieceID);
  const pieces = useSelector(dbDataPiece);

  useEffect(() => {
    // To automatically highlight the current loaded element
    // BUG to fix: either select current loaded element if loading or current liked element if linking
    if (!rowSelected && rowSelected !== currentPieceID) dispatch(setLoadTableRowSelected(currentPieceID));
  }, [rowSelected, currentPieceID, dispatch]);

  const handleSort = (e: any) => {
    // Sort parameters when clicking on a header
    if (e.target.id === tableSort.param) {
      dispatch(setLoadTableSort({ param: e.target.id, direction: !tableSort.direction }));
    } else {
      dispatch(setLoadTableSort({ param: e.target.id, direction: true }));
    }
  };

  return (
    <LoadTableComponent
      header={
        <>
          <LoadTableHeaderCell id={"name"} label={"Nom"} width={30} onClick={handleSort} sort={tableSort} />
          <LoadTableHeaderCell id={"description"} label={"Description"} width={47} onClick={() => {}} sort={tableSort} />
          <LoadTableHeaderCell
            id={"lastUpdated"}
            label={"Dernière modification"}
            width={23}
            onClick={handleSort}
            sort={tableSort}
          />
        </>
      }
      body={Object.values(pieces)
        // TODO: search field
        // .filter(([key, value]) => {
        //   return filter ? currentGraph._id !== key && graphFilter(value, filter) : true;
        // })
        .sort((a, b) => pieceLoadTableSort(a, b, tableSort))
        .map((piece) => {
          return (
            <tr
              onClick={(e) => dispatch(setLoadTableRowSelected((e.target as HTMLTableRowElement).id))}
              id={piece._id}
              key={piece._id}
              className={piece._id === rowSelected ? "table-primary" : ""}
            >
              <td id={piece._id}>{piece.name}</td>
              <td id={piece._id}>{piece.description ? piece.description : "-"}</td>
              <td id={piece._id}>{dateToDisplayString(piece.lastUpdated, true)}</td>
            </tr>
          );
        })}
    />
  );
};

export default PieceTable;
