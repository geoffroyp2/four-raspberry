import { batch } from "react-redux";
import { store } from "@app/store";

import { PieceQueryRes } from "@baseTypes/database/GQLResTypes";

import { setPieceData, setPieceLoadList, setPieceNeedsRefresh } from "../_state/pieceDataSlice";
import { setPieceLoadPage, setPieceTotalAmount } from "../_state/pieceDisplaySlice";

import { getPieceFieldsQuery, getPiecePageRequest } from "./queryDocuments";
import client from "@network/apolloClient";

export const loadPiece = async (id: number) => {
  const { data } = await client.query<PieceQueryRes>({ query: getPieceFieldsQuery(id) });
  if (data) {
    batch(() => {
      store.dispatch(setPieceData(data.pieces.rows[0]));
      store.dispatch(setPieceNeedsRefresh(false));
    });
  }
};

export const loadPieceList = async (page: number, amount: number) => {
  const { data } = await client.query<PieceQueryRes>({ query: getPiecePageRequest({ page, amount }) });
  if (data) {
    if (page !== 0 && data.pieces.rows.length === 0) {
      // if current page has no result
      store.dispatch(setPieceLoadPage(0));
    } else {
      batch(() => {
        store.dispatch(setPieceTotalAmount(data.pieces.count));
        store.dispatch(setPieceLoadList(data.pieces.rows));
      });
    }
  }
};
