import { useState } from "react";
import { useParams } from "react-router";

import { useQuery } from "@apollo/client";
import { recordQuery, TargetQueryParams } from "../_gql/queries";

import { useDispatch } from "react-redux";
import { setGraphLoadId } from "../_state/graphDisplaySlice";
import { setRecordData } from "../_state/recordDataSlice";

import { TargetQueryRes } from "@app/_types/dbTypes";

import TargetInfos from "./TargetInfos";
import NotFound from "@editor/NotFound";

const TargetLoader = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [invalidId, setInvalidId] = useState<boolean>(isNaN(+params.id));

  const targetId = isNaN(+params.id) ? 0 : +params.id;
  const variables: TargetQueryParams = {
    variables: {
      id: targetId,
    },
  };

  const { loading, error } = useQuery<TargetQueryRes>(recordQuery, {
    ...variables,
    onCompleted: ({ targets }) => {
      if (targets.rows[0]) {
        if (targetId !== targets.rows[0].id) {
          setInvalidId(true);
        } else {
          dispatch(setGraphLoadId({ recordId: targets.rows[0].id }));
          dispatch(setRecordData(targets.rows[0]));
        }
      }
    },
  });

  if (loading) return <div>Loading...</div>;

  if (error || invalidId) {
    return <NotFound />;
  }

  return <TargetInfos />;
};

export default TargetLoader;
