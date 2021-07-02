import { FC, useEffect } from "react";
import { useParams } from "react-router";

import { useLazyQuery } from "@apollo/client";
import { recordQuery, RecordQueryParams } from "../_gql/queries";

import { useDispatch } from "react-redux";
import { setRecordLoadId } from "../_state/recordDisplaySlice";
import { setRecordData } from "../_state/recordDataSlice";

import { RecordQueryRes } from "@app/_types/dbTypes";

import RecordInfosPage from "./RecordInfosPage";
import NotFound from "@editor/NotFound";

const RecordFetcher: FC = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [loadRecordData, { error }] = useLazyQuery<RecordQueryRes>(recordQuery, {
    onCompleted: ({ records }) => {
      if (records.rows[0]) {
        dispatch(setRecordLoadId(records.rows[0].id!));
        dispatch(setRecordData(records.rows[0]));
      }
    },
  });

  useEffect(() => {
    const recordId = isNaN(+params.id) ? 0 : +params.id;
    const mainParams: RecordQueryParams = {
      variables: {
        id: recordId,
      },
    };
    loadRecordData(mainParams);
  }, [params, loadRecordData]);

  if (error || isNaN(+params.id)) {
    return <NotFound />;
  }

  return <RecordInfosPage />;
};

export default RecordFetcher;
