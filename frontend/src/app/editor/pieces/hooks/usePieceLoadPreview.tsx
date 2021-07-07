import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { piecePreviewQuery, PieceQueryParams } from "../_gql/queries";
import { PieceQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setPiecePreview } from "../_state/pieceDataSlice";
import { selectPiecePreviewLoadId } from "../_state/pieceDisplaySlice";

const usePieceLoadPreview = () => {
  const dispatch = useDispatch();
  const pieceId = useSelector(selectPiecePreviewLoadId);

  const [loadPiecePreview, status] = useLazyQuery<PieceQueryRes>(piecePreviewQuery, {
    onCompleted: ({ pieces }) => {
      if (pieces.rows[0] && pieces.rows[0].id === pieceId) {
        dispatch(setPiecePreview(pieces.rows[0]));
      }
    },
  });

  useEffect(() => {
    if (pieceId === null) {
      dispatch(setPiecePreview({}));
    } else {
      const mainParams: PieceQueryParams = {
        variables: {
          id: pieceId ?? 0,
        },
      };
      loadPiecePreview(mainParams);
    }
  }, [pieceId, dispatch, loadPiecePreview]);

  return status;
};

export default usePieceLoadPreview;
