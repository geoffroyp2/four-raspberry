import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { piecePageQuery, PiecePageQueryParams } from "../_gql/queries";
import { PieceQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setPieceLoadList } from "../_state/pieceDataSlice";
import {
  selectPieceLoadAmount,
  selectPieceLoadPage,
  selectPieceNameSearch,
  selectPieceSortDirection,
  selectPieceSortParam,
  setPieceLoadPage,
  setPieceTotalAmount,
} from "../_state/pieceDisplaySlice";

const usePieceLoadPage = () => {
  const dispatch = useDispatch();

  const currentLoadAmount = useSelector(selectPieceLoadAmount);
  const currentLoadPage = useSelector(selectPieceLoadPage);
  const pieceNameSearch = useSelector(selectPieceNameSearch);
  const pieceSortParam = useSelector(selectPieceSortParam);
  const pieceSortDirection = useSelector(selectPieceSortDirection);

  const [loadPiecePage, status] = useLazyQuery<PieceQueryRes>(piecePageQuery, {
    onCompleted: ({ pieces }) => {
      if (currentLoadPage !== 0 && pieces.rows.length === 0) {
        // if current page has no result
        dispatch(setPieceLoadPage(0));
      } else {
        dispatch(setPieceLoadList(pieces.rows));
        dispatch(setPieceTotalAmount(pieces.count));
      }
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const variables: PiecePageQueryParams = {
      variables: {
        page: currentLoadPage,
        amount: currentLoadAmount,
        sort: {
          sortBy: pieceSortParam,
          order: pieceSortDirection,
        },
      },
    };
    if (pieceNameSearch !== null) variables.variables["name"] = pieceNameSearch;
    loadPiecePage(variables);
  }, [currentLoadPage, currentLoadAmount, pieceNameSearch, pieceSortParam, pieceSortDirection, loadPiecePage]);

  return status;
};

export default usePieceLoadPage;
