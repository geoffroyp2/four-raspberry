import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { recordQuery, RecordQueryParams } from "../_gql/queries";
import { RecordQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setRecordData } from "../_state/recordDataSlice";
import { selectRecordMainLoadId, setRecordMainLoadId } from "../_state/recordDisplaySlice";

const useRecordLoadMain = () => {
  const dispatch = useDispatch();
  const recordId = useSelector(selectRecordMainLoadId);

  const [loadRecordData, status] = useLazyQuery<RecordQueryRes>(recordQuery, {
    onCompleted: ({ records }) => {
      if (records.rows[0]) {
        if (recordId !== records.rows[0].id) dispatch(setRecordMainLoadId(records.rows[0].id!));
        dispatch(setRecordData(records.rows[0]));
      }
    },
  });

  useEffect(() => {
    const mainParams: RecordQueryParams = {
      variables: {
        id: recordId ?? 0,
      },
    };
    loadRecordData(mainParams);
  }, [recordId, loadRecordData]);

  return status;
};

export default useRecordLoadMain;
