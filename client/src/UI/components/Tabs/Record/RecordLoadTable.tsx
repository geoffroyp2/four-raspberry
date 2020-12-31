import React, { useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { LoadTableContent, LoadTableRowSelected, setLoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";
import { dbDataRecord } from "@redux/dataReducers/dbDataSlice";
import { CurrentRecord, loadRecord } from "@redux/dataReducers/recordSlice";

import LoadTable from "@UITabs/sharedComponents/LoadTable/LoadTable";

import db from "@db/handler";

const RecordLoadTable = () => {
  const dispatch = useDispatch();

  const currentRecord = useSelector(CurrentRecord);
  const content = useSelector(LoadTableContent);
  const rowSelected = useSelector(LoadTableRowSelected);
  const records = useSelector(dbDataRecord);

  const [Pending, setPending] = useState<boolean>(false);

  const handleSelect = useCallback(() => {
    if (rowSelected) dispatch(loadRecord(records[rowSelected]));
    dispatch(setLoadTableShow(false));
  }, [dispatch, rowSelected, records]);

  const handleCancel = useCallback(() => {
    dispatch(setLoadTableShow(false));
  }, [dispatch]);

  const handleSave = useCallback(async () => {
    if (content === "Reference") {
      setPending(true);
      await db.record.changeReference(currentRecord._id, rowSelected);
      setPending(false);
    } else if (content === "Piece") {
      setPending(true);
      await db.record.addPiece(currentRecord._id, rowSelected);
      setPending(false);
    }
    dispatch(setLoadTableShow(false));
  }, [dispatch, content, currentRecord, rowSelected]);

  return (
    <LoadTable
      select={handleSelect}
      cancel={handleCancel}
      save={content === "Reference" || content === "Piece" ? { cb: handleSave, pending: Pending } : null}
    />
  );
};

export default RecordLoadTable;
