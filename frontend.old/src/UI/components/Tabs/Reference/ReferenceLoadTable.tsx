import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { LoadTableRowSelected, setLoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";
import { dbDataReference } from "@redux/dataReducers/dbDataSlice";
import { loadReference } from "@redux/dataReducers/referenceSlice";

import LoadTable from "@UITabs/sharedComponents/LoadTable/LoadTable";

const ReferenceLoadTable = () => {
  const dispatch = useDispatch();
  const rowSelected = useSelector(LoadTableRowSelected);
  const references = useSelector(dbDataReference);

  const handleSelect = useCallback(() => {
    if (rowSelected) dispatch(loadReference(references[rowSelected]));
    dispatch(setLoadTableShow(false));
  }, [dispatch, rowSelected, references]);

  const handleCancel = useCallback(() => {
    dispatch(setLoadTableShow(false));
  }, [dispatch]);

  return <LoadTable select={handleSelect} cancel={handleCancel} save={null} />;
};

export default ReferenceLoadTable;
