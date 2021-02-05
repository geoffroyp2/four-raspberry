import React, { FC, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentRecordId, selectRecordData } from "./state/recordDataSlice";

import InfoCard from "@components/InfoCard";
import NameField from "@components/InfoCardElements/NameField";
import { validateRecord } from "./utils/editValidation";
import { loadRecord } from "./utils/loadData";
import { selectRecordEdit, selectRecordPending, setRecordEdit, setRecordPending } from "./state/recordStateSlice";

const RecordInfos: FC = () => {
  const dispatch = useDispatch();
  const recordId = useSelector(selectCurrentRecordId);
  const record = useSelector(selectRecordData);
  const editStates = useSelector(selectRecordEdit);
  const pendingStates = useSelector(selectRecordPending);

  useEffect(() => {
    const load = async () => {
      dispatch(setRecordPending({ data: true }));
      await loadRecord(recordId);
      dispatch(setRecordPending({ data: false }));
    };
    if (record.id !== recordId) load();
  }, [dispatch, recordId, record]);

  return (
    <InfoCard>
      {pendingStates.data ? (
        <></>
      ) : (
        <NameField
          data={selectRecordData}
          validate={validateRecord}
          edit={editStates.name}
          setEdit={(val: boolean) => dispatch(setRecordEdit({ name: val }))}
          pending={pendingStates.name}
        />
      )}
    </InfoCard>
  );
};

export default RecordInfos;
