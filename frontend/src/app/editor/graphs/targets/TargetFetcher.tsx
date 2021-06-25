import { FC, useState } from "react";
import { useParams } from "react-router";

import { useQuery } from "@apollo/client";
import { targetPointsQuery, targetQuery, TargetQueryParams } from "../_gql/queries";

import { useDispatch, useSelector } from "react-redux";
import { selectGraphPointZoom, setGraphLoadId } from "../_state/graphDisplaySlice";
import { setTargetData, setTargetPoints } from "../_state/targetDataSlice";

import { TargetQueryRes } from "@app/_types/dbTypes";

import { IdQueryParams } from "@editor/_gql/types";
import TargetInfosPage from "./TargetInfosPage";
import NotFound from "@editor/NotFound";

const TargetFetcher: FC = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const pointFilter = useSelector(selectGraphPointZoom);

  const [invalidId, setInvalidId] = useState<boolean>(isNaN(+params.id));

  const targetId = isNaN(+params.id) ? 0 : +params.id;
  const mainParams: TargetQueryParams = {
    variables: {
      id: targetId,
    },
  };

  const mainData = useQuery<TargetQueryRes>(targetQuery, {
    ...mainParams,
    onCompleted: ({ targets }) => {
      if (targets.rows[0]) {
        if (targetId !== targets.rows[0].id) {
          setInvalidId(true);
        } else {
          dispatch(setGraphLoadId({ targetId: targets.rows[0].id }));
          dispatch(setTargetData(targets.rows[0]));
        }
      }
    },
  });

  const pointsParams: IdQueryParams = {
    variables: { id: targetId ?? 0 },
  };

  const pointData = useQuery<TargetQueryRes>(targetPointsQuery(pointFilter), {
    ...pointsParams,
    onCompleted: ({ targets }) => {
      if (targets.rows[0]) {
        dispatch(setTargetPoints(targets.rows[0].points));
      }
    },
  });

  if (mainData.error || pointData.error || invalidId) {
    return <NotFound />;
  }

  return <TargetInfosPage />;
};

export default TargetFetcher;
