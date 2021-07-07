import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { targetPreviewQuery, TargetQueryParams } from "../_gql/queries";
import { TargetQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setTargetPreview } from "../_state/targetDataSlice";
import { selectTargetPreviewLoadId } from "../_state/targetDisplaySlice";

const useTargetLoadPreview = () => {
  const dispatch = useDispatch();
  const targetId = useSelector(selectTargetPreviewLoadId);

  const [loadTargetPreview, status] = useLazyQuery<TargetQueryRes>(targetPreviewQuery, {
    onCompleted: ({ targets }) => {
      if (targets.rows[0] && targets.rows[0].id === targetId) {
        dispatch(setTargetPreview(targets.rows[0]));
      }
    },
  });

  useEffect(() => {
    const mainParams: TargetQueryParams = {
      variables: {
        id: targetId ?? 0,
      },
    };
    loadTargetPreview(mainParams);
  }, [targetId, loadTargetPreview]);

  return status;
};

export default useTargetLoadPreview;
