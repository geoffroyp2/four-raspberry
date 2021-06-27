import { FC, useState } from "react";
import { useParams } from "react-router";

import { useQuery } from "@apollo/client";
import { targetQuery, TargetQueryParams } from "../_gql/queries";

import { useDispatch } from "react-redux";
import { setTargetLoadId } from "../_state/targetDisplaySlice";
import { setTargetData } from "../_state/targetDataSlice";

import { TargetQueryRes } from "@app/_types/dbTypes";

import TargetInfosPage from "./TargetInfosPage";
import NotFound from "@editor/NotFound";

const TargetFetcher: FC = () => {
  const dispatch = useDispatch();
  const params = useParams();

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
          dispatch(setTargetLoadId(targets.rows[0].id));
          dispatch(setTargetData(targets.rows[0]));
        }
      }
    },
  });

  if (mainData.error || invalidId) {
    return <NotFound />;
  }

  return <TargetInfosPage />;
};

export default TargetFetcher;
