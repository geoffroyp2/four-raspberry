import { FC, useEffect } from "react";
import { useParams } from "react-router";

import { useLazyQuery } from "@apollo/client";
import { targetQuery, TargetQueryParams } from "../_gql/queries";
import { TargetQueryRes } from "@app/_types/dbTypes";

import { useDispatch } from "react-redux";
import { setTargetLoadId } from "../_state/targetDisplaySlice";
import { setTargetData } from "../_state/targetDataSlice";

import TargetInfosPage from "./TargetInfosPage";
import NotFound from "@editor/NotFound";

const TargetFetcher: FC = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [loadTargetData, { error }] = useLazyQuery<TargetQueryRes>(targetQuery, {
    onCompleted: ({ targets }) => {
      if (targets.rows[0]) {
        dispatch(setTargetLoadId(targets.rows[0].id!));
        dispatch(setTargetData(targets.rows[0]));
      }
    },
  });

  useEffect(() => {
    const targetId = isNaN(+params.id) ? 0 : +params.id;
    const mainParams: TargetQueryParams = {
      variables: {
        id: targetId,
      },
    };
    loadTargetData(mainParams);
  }, [params, loadTargetData]);

  if (error || isNaN(+params.id)) {
    return <NotFound />;
  }

  return <TargetInfosPage />;
};

export default TargetFetcher;
