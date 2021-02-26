import { batch } from "react-redux";
import { store } from "@app/store";
import { sendGQLQuery } from "@network/GQLClient";

import { PieceQueryRes } from "@baseTypes/database/GQLResTypes";

import { setPieceData, setPieceLoadList, setPieceNeedsRefresh } from "../_state/pieceDataSlice";
import { setPieceLoadPage, setPieceTotalAmount } from "../_state/pieceDisplaySlice";

import { getPieceFieldsQuery, getPiecePageRequest } from "./dataRequests";

export const loadPiece = async (id: number) => {
  const res = await sendGQLQuery<PieceQueryRes>(getPieceFieldsQuery(id));
  if (res) {
    batch(() => {
      store.dispatch(setPieceData(res.pieces.rows[0]));
      store.dispatch(setPieceNeedsRefresh(false));
    });
  }
};

export const loadPieceList = async (page: number, amount: number) => {
  const res = await sendGQLQuery<PieceQueryRes>(getPiecePageRequest({ page, amount }));
  if (res) {
    if (page !== 0 && res.pieces.rows.length === 0) {
      // if current page has no result
      store.dispatch(setPieceLoadPage(0));
    } else {
      batch(() => {
        store.dispatch(setPieceTotalAmount(res.pieces.count));
        store.dispatch(setPieceLoadList(res.pieces.rows));
      });
    }
  }
};
