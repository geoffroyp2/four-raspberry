import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { pieceQuery, PieceQueryParams } from "../_gql/queries";
import { PieceQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setPieceData } from "../_state/pieceDataSlice";
import { selectPieceMainLoadId, setPieceMainLoadId } from "../_state/pieceDisplaySlice";

const usePieceLoadMain = () => {
  const dispatch = useDispatch();
  const pieceId = useSelector(selectPieceMainLoadId);

  const [loadPieceData, status] = useLazyQuery<PieceQueryRes>(pieceQuery, {
    onCompleted: ({ pieces }) => {
      if (pieces.rows[0]) {
        if (pieceId !== pieces.rows[0].id) dispatch(setPieceMainLoadId(pieces.rows[0].id!));
        dispatch(setPieceData(pieces.rows[0]));
      }
    },
  });

  useEffect(() => {
    const mainParams: PieceQueryParams = {
      variables: {
        id: pieceId ?? 0,
      },
    };
    loadPieceData(mainParams);
  }, [pieceId, loadPieceData]);

  return status;
};

export default usePieceLoadMain;
