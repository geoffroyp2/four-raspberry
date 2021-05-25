import { useState } from "react";
import { useParams } from "react-router";

import { useQuery } from "@apollo/client";
import { recordPointsQuery, recordQuery, RecordQueryParams } from "../_gql/queries";

import { useDispatch, useSelector } from "react-redux";
import { selectGraphPointZoom, setGraphLoadId } from "../_state/graphDisplaySlice";
import { setRecordData, setRecordPoints, setRecordTargetPoints } from "../_state/recordDataSlice";

import { RecordQueryRes } from "@app/_types/dbTypes";

import RecordInfos from "./RecordInfos";
import NotFound from "@editor/NotFound";
import { IdQueryParams } from "@editor/_gql/types";

const RecordLoader = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const pointFilter = useSelector(selectGraphPointZoom);

  const [invalidId, setInvalidId] = useState<boolean>(isNaN(+params.id));

  const recordId = isNaN(+params.id) ? 0 : +params.id;
  const mainParams: RecordQueryParams = {
    variables: {
      id: recordId,
    },
  };

  const mainData = useQuery<RecordQueryRes>(recordQuery, {
    ...mainParams,
    onCompleted: ({ records }) => {
      if (records.rows[0]) {
        if (recordId !== records.rows[0].id) {
          setInvalidId(true);
        } else {
          dispatch(setGraphLoadId({ recordId: records.rows[0].id }));
          dispatch(setRecordData(records.rows[0]));
        }
      }
    },
  });

  const pointsParams: IdQueryParams = {
    variables: { id: recordId ?? 0 },
  };

  const pointData = useQuery<RecordQueryRes>(recordPointsQuery(pointFilter), {
    ...pointsParams,
    onCompleted: ({ records }) => {
      if (records.rows[0]) {
        dispatch(setRecordPoints(records.rows[0].points));
        dispatch(setRecordTargetPoints(records.rows[0].target?.points));
      }
    },
  });

  if (mainData.error || pointData.error || invalidId) {
    return <NotFound />;
  }

  return <RecordInfos />;
};

export default RecordLoader;
