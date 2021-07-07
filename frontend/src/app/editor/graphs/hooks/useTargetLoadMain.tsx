import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { targetQuery, TargetQueryParams } from "../_gql/queries";
import { TargetQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setTargetData } from "../_state/targetDataSlice";
import { selectTargetMainLoadId, setTargetMainLoadId } from "../_state/targetDisplaySlice";

const useTargetLoadMain = () => {
  const dispatch = useDispatch();
  const targetId = useSelector(selectTargetMainLoadId);

  const [loadTargetData, status] = useLazyQuery<TargetQueryRes>(targetQuery, {
    onCompleted: ({ targets }) => {
      if (targets.rows[0]) {
        if (targetId !== targets.rows[0].id) dispatch(setTargetMainLoadId(targets.rows[0].id!));
        dispatch(setTargetData(targets.rows[0]));
      }
    },
  });

  useEffect(() => {
    const mainParams: TargetQueryParams = {
      variables: {
        id: targetId ?? 0,
      },
    };
    loadTargetData(mainParams);
  }, [targetId, loadTargetData]);

  return status;
};

export default useTargetLoadMain;
