import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { targetPointsQuery } from "../_gql/queries";
import { TargetQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetData, setTargetPoints } from "../_state/targetDataSlice";
import { selectTargetPointZoom } from "../_state/targetDisplaySlice";
import { IdQueryParams } from "@editor/_gql/types";

const useTargetLoadPoints = () => {
  const dispatch = useDispatch();
  const target = useSelector(selectTargetData);
  const pointFilter = useSelector(selectTargetPointZoom);

  const [loadPoints, status] = useLazyQuery<TargetQueryRes>(targetPointsQuery(pointFilter), {
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

  return status;
};

export default useTargetLoadPoints;
