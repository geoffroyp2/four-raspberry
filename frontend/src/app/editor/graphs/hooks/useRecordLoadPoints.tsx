import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { recordPointsQuery } from "../_gql/queries";
import { RecordQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordData, setRecordPoints, setRecordTargetPoints } from "../_state/recordDataSlice";
import { selectRecordPointZoom } from "../_state/recordDisplaySlice";
import { IdQueryParams } from "@editor/_gql/types";

const useRecordLoadPoints = () => {
  const dispatch = useDispatch();
  const record = useSelector(selectRecordData);
  const pointFilter = useSelector(selectRecordPointZoom);

  const [loadPoints, status] = useLazyQuery<RecordQueryRes>(recordPointsQuery(pointFilter), {
    onCompleted: ({ records }) => {
      if (records.rows[0]) {
        dispatch(setRecordPoints(records.rows[0].points));
        dispatch(setRecordTargetPoints(records.rows[0].target?.points ?? []));
      }
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const pointsParams: IdQueryParams = {
      variables: { id: record.id ?? 0 },
    };
    loadPoints(pointsParams);
  }, [record.id, record.target?.id, pointFilter, loadPoints]);

  return status;
};

export default useRecordLoadPoints;
