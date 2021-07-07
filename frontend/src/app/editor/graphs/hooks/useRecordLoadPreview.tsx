import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { recordPreviewQuery, RecordQueryParams } from "../_gql/queries";
import { RecordQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setRecordPreview } from "../_state/recordDataSlice";
import { selectRecordPreviewLoadId } from "../_state/recordDisplaySlice";

const useRecordLoadPreview = () => {
  const dispatch = useDispatch();
  const recordId = useSelector(selectRecordPreviewLoadId);

  const [loadRecordPreview, status] = useLazyQuery<RecordQueryRes>(recordPreviewQuery, {
    onCompleted: ({ records }) => {
      if (records.rows[0] && records.rows[0].id === recordId) {
        dispatch(setRecordPreview(records.rows[0]));
      }
    },
  });

  useEffect(() => {
    const mainParams: RecordQueryParams = {
      variables: {
        id: recordId ?? 0,
      },
    };
    loadRecordPreview(mainParams);
  }, [recordId, loadRecordPreview]);

  return status;
};

export default useRecordLoadPreview;
