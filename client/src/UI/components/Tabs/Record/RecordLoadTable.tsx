import React, { useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { LoadTableContent, LoadTableRowSelected, setLoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";
import {
  dbDataPiece,
  dbDataRecord,
  dbDataReference,
  updatePiece,
  updateRecord,
  updateReference,
} from "@redux/dataReducers/dbDataSlice";
import { CurrentRecord, loadRecord } from "@redux/dataReducers/recordSlice";

import LoadTable from "@UITabs/sharedComponents/LoadTable/LoadTable";

import db from "@db/handler";

const RecordLoadTable = () => {
  const dispatch = useDispatch();

  const currentRecord = useSelector(CurrentRecord);
  const content = useSelector(LoadTableContent);
  const rowSelected = useSelector(LoadTableRowSelected);
  const records = useSelector(dbDataRecord);
  const references = useSelector(dbDataReference);
  const pieces = useSelector(dbDataPiece);

  const [Pending, setPending] = useState<boolean>(false);

  const handleSelect = useCallback(() => {
    if (rowSelected) dispatch(loadRecord(records[rowSelected]));
    dispatch(setLoadTableShow(false));
  }, [dispatch, rowSelected, records]);

  const handleCancel = useCallback(() => {
    dispatch(setLoadTableShow(false));
  }, [dispatch]);

  // To add Reference or Piece to the current record
  const handleSave = useCallback(async () => {
    // Update reference if needed
    if (content === "Reference") {
      setPending(true);

      // Remove Record in previous Reference
      if (currentRecord.reference) {
        const previousReference = {
          ...references[currentRecord.reference],
          records: [...references[currentRecord.reference].records].filter((x) => x !== currentRecord._id),
        };
        await db.reference.updateOne(previousReference).then((res) => {
          dispatch(updateReference(res));
        });
      }

      // add Record in new Reference
      const newReference = {
        ...references[rowSelected],
        records: [...references[rowSelected].records.concat(currentRecord._id)],
      };
      await db.reference.updateOne(newReference).then((res) => {
        dispatch(updateReference(res));
      });

      // update Record
      const updatedRecord = { ...currentRecord, reference: rowSelected };
      await db.record.updateOne(updatedRecord).then((res) => {
        setPending(false);
        dispatch(updateRecord(res));
        dispatch(loadRecord(res));
        dispatch(setLoadTableShow(false));
      });

      // Add selected Piece in the list
    } else if (content === "Piece" && !currentRecord.pieces.includes(rowSelected)) {
      setPending(true);

      // add Record in Piece
      const updatedPiece = { ...pieces[rowSelected], records: [...pieces[rowSelected].records].concat(currentRecord._id) };
      await db.piece.updateOne(updatedPiece).then((res) => {
        dispatch(updatePiece(res));
      });

      // add Piece in Record
      const updatedRecord = { ...currentRecord, pieces: [...currentRecord.pieces].concat(rowSelected) };
      await db.record.updateOne(updatedRecord).then((res) => {
        setPending(false);
        dispatch(updateRecord(res));
        dispatch(loadRecord(res));
        dispatch(setLoadTableShow(false));
      });
    } else {
      // if nothing needs to be updated
      dispatch(setLoadTableShow(false));
    }
  }, [dispatch, currentRecord, rowSelected, content, pieces, references]);

  return (
    <LoadTable
      select={handleSelect}
      cancel={handleCancel}
      save={content === "Reference" || content === "Piece" ? { cb: handleSave, pending: Pending } : null}
    />
  );
};

export default RecordLoadTable;
