import React, { useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { LoadTableContent, LoadTableRowSelected, setLoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";
import { dbDataPiece } from "@redux/dataReducers/dbDataSlice";
import { loadPiece } from "@redux/dataReducers/pieceSlice";

import LoadTable from "@UITabs/sharedComponents/LoadTable/LoadTable";
import db from "@db/handler";

const PieceLoadTable = () => {
  const dispatch = useDispatch();
  const rowSelected = useSelector(LoadTableRowSelected);
  const content = useSelector(LoadTableContent);
  const pieces = useSelector(dbDataPiece);

  const [Pending, setPending] = useState<boolean>(false);

  const handleSelect = useCallback(() => {
    if (rowSelected) dispatch(loadPiece(pieces[rowSelected]));
    dispatch(setLoadTableShow(false));
  }, [dispatch, rowSelected, pieces]);

  const handleCancel = useCallback(() => {
    dispatch(setLoadTableShow(false));
  }, [dispatch]);

  const handleSave = useCallback(async () => {
    if (content === "Record") {
      setPending(true);
      await db.piece.addRecord(rowSelected);
      setPending(false);
    }
    dispatch(setLoadTableShow(false));
  }, [dispatch, content, rowSelected]);

  return (
    <LoadTable
      select={handleSelect}
      cancel={handleCancel}
      save={content === "Record" ? { cb: handleSave, pending: Pending } : null}
    />
  );
};

export default PieceLoadTable;
