import { FC, useEffect } from "react";
import { useParams } from "react-router";

import { useLazyQuery } from "@apollo/client";
import { pieceQuery, PieceQueryParams } from "./_gql/queries";
import { PieceQueryRes } from "@app/_types/dbTypes";

import { useDispatch } from "react-redux";
import { setPieceLoadId } from "./_state/pieceDisplaySlice";
import { setPieceData } from "./_state/pieceDataSlice";

import PieceInfosPage from "./PieceInfosPage";
import NotFound from "@editor/NotFound";

const PieceFetcher: FC = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [loadPieceData, { error }] = useLazyQuery<PieceQueryRes>(pieceQuery, {
    onCompleted: ({ pieces }) => {
      if (pieces.rows[0]) {
        dispatch(setPieceLoadId(pieces.rows[0].id!));
        dispatch(setPieceData(pieces.rows[0]));
      }
    },
  });

  useEffect(() => {
    const pieceId = isNaN(+params.id) ? 0 : +params.id;
    const mainParams: PieceQueryParams = {
      variables: {
        id: pieceId,
      },
    };
    loadPieceData(mainParams);
  }, [params, loadPieceData]);

  if (error || isNaN(+params.id)) {
    return <NotFound />;
  }

  return <PieceInfosPage />;
};

export default PieceFetcher;
