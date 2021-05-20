import { useState } from "react";
import { useParams } from "react-router";

import { useQuery } from "@apollo/client";
import { recordQuery, RecordQueryParams } from "../_gql/queries";

import { useDispatch } from "react-redux";
import { setGraphLoadId } from "../_state/graphDisplaySlice";
import { setRecordData } from "../_state/recordDataSlice";

import { RecordQueryRes } from "@app/_types/dbTypes";

import RecordInfos from "./RecordInfos";
import NotFound from "@editor/NotFound";

const RecordLoader = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [invalidId, setInvalidId] = useState<boolean>(isNaN(+params.id));

  const recordId = isNaN(+params.id) ? 0 : +params.id;
  const variables: RecordQueryParams = {
    variables: {
      id: recordId,
    },
  };

  const { loading, error } = useQuery<RecordQueryRes>(recordQuery, {
    ...variables,
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

  if (loading) return <div>Loading...</div>;

  if (error || invalidId) {
    return <NotFound />;
  }

  return <RecordInfos />;
};

export default RecordLoader;
