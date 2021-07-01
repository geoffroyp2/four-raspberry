import { FC, useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { targetPointsQuery } from "../_gql/queries";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetPointZoom } from "../_state/targetDisplaySlice";
import { selectTargetData, selectTargetTempPoints, selectTargetTempColor, setTargetPoints } from "../_state/targetDataSlice";

import { IdQueryParams } from "@editor/_gql/types";
import { TargetQueryRes } from "@app/_types/dbTypes";

import NotFound from "@editor/NotFound";
import SimpleGraph from "@components/graphs/SimpleGraph";

const TargetGraph: FC = () => {
  const dispatch = useDispatch();

  const target = useSelector(selectTargetData);
  const targetPoints = useSelector(selectTargetTempPoints);
  const pointFilter = useSelector(selectTargetPointZoom);

  const color = useSelector(selectTargetTempColor);

  const [loadPoints, { error, loading }] = useLazyQuery<TargetQueryRes>(targetPointsQuery(pointFilter), {
    onCompleted: ({ targets }) => {
      if (targets.rows[0]) {
        dispatch(setTargetPoints(targets.rows[0].points));
      }
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const pointsParams: IdQueryParams = {
      variables: { id: target.id ?? 0 },
    };
    loadPoints(pointsParams);
  }, [target.id, pointFilter, loadPoints]);

  if (error) return <NotFound />;
  if (loading) return <SimpleGraph targetPoints={[]} color={{ r: 0, g: 0, b: 0, a: 0 }} />;

  return <SimpleGraph targetPoints={targetPoints} color={color} />;
};

export default TargetGraph;
