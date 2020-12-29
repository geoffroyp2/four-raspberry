import engine from "@engine/handler";
import { dbDataReference } from "@redux/dataReducers/dbDataSlice";
import { updateEngineReference } from "@redux/dataReducers/engineDataSlice";

import { LoadTableRowSelected, setLoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";
import LoadTable from "@UITabs/sharedComponents/LoadTable/LoadTable";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RunLoadTable = () => {
  const dispatch = useDispatch();
  const rowSelected = useSelector(LoadTableRowSelected);
  const references = useSelector(dbDataReference);

  const [Pending, setPending] = useState<boolean>(false);

  const handleSelect = useCallback(async () => {
    if (rowSelected) {
      setPending(true);
      const ref = await engine.loadReference(references[rowSelected]);
      // TODO : handle updates in network
      setPending(false);
      if (ref) {
        dispatch(updateEngineReference(ref));
        dispatch(setLoadTableShow(false));
      }
    }
  }, [dispatch, rowSelected, references]);

  const handleCancel = useCallback(() => {
    dispatch(setLoadTableShow(false));
  }, [dispatch]);

  return <LoadTable select={() => {}} cancel={handleCancel} save={{ cb: handleSelect, pending: Pending }} />;
};

export default RunLoadTable;
