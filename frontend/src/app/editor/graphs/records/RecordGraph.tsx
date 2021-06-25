import { FC, useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { recordPointsQuery } from "../_gql/queries";

import { useDispatch, useSelector } from "react-redux";
import { selectGraphPointZoom } from "../_state/graphDisplaySlice";
import {
  selectRecordData,
  selectRecordPoints,
  selectRecordTargetPoints,
  selectRecordTempValues,
  setRecordPoints,
  setRecordTargetPoints,
} from "../_state/recordDataSlice";

import { IdQueryParams } from "@editor/_gql/types";
import { RecordQueryRes } from "@app/_types/dbTypes";

import NotFound from "@editor/NotFound";
import SimpleGraph from "@components/graphs/SimpleGraph";

const RecordGraph: FC = () => {
  const dispatch = useDispatch();

  const record = useSelector(selectRecordData);
  const recordPoints = useSelector(selectRecordPoints);
  const targetpoints = useSelector(selectRecordTargetPoints);
  const pointFilter = useSelector(selectGraphPointZoom);

  const { color } = useSelector(selectRecordTempValues);

  const [loadPoint, { error, loading }] = useLazyQuery<RecordQueryRes>(recordPointsQuery(pointFilter), {
    onCompleted: ({ records }) => {
      console.log("Got Data");

      if (records.rows[0]) {
        dispatch(setRecordPoints(records.rows[0].points));
        dispatch(setRecordTargetPoints(records.rows[0].target?.points ?? []));
      }
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    console.log("Loading");
    const pointsParams: IdQueryParams = {
      variables: { id: record.id ?? 0 },
    };
    loadPoint(pointsParams);
  }, [record.id, record.target?.id, pointFilter, loadPoint]);

  if (error) return <NotFound />;
  if (loading) return <SimpleGraph recordPoints={[]} targetPoints={[]} color={{ r: 0, g: 0, b: 0, a: 0 }} />;

  return <SimpleGraph recordPoints={recordPoints} targetPoints={targetpoints} color={color} />;
};

export default RecordGraph;
