import { store } from "@app/store";
import { setNeedRefresh } from "@editor/_shared/setNeedsRefresh";
import { setPieceData, setPieceId } from "../_state/pieceDataSlice";

import { Piece } from "@baseTypes/database/GQLResTypes";
import { allPieceFields } from "./dataRequests";

import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { sendGQLQuery } from "@network/GQLClient";

export const savePieceChanges = async (pieceId: number, newData: Piece) => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "updatePiece",
      args: {
        pieceId,
        ...newData,
      },
      res: allPieceFields,
    },
  });
  const res = await sendGQLQuery<{ updatePiece: Piece }>(request);
  if (res) {
    setNeedRefresh("piece");
    store.dispatch(setPieceData(res.updatePiece));
  }
};

export const createPiece = async () => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "createPiece",
      args: {},
      res: allPieceFields,
    },
  });
  const res = await sendGQLQuery<{ createPiece: Piece }>(request);
  if (res) {
    setNeedRefresh("piece");
    store.dispatch(setPieceData(res.createPiece));
  }
};

export const deletePiece = async (pieceId: number) => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "deletePiece",
      args: { pieceId },
    },
  });
  const res = await sendGQLQuery<{ deletePiece: boolean }>(request);
  if (res) {
    setNeedRefresh("piece");
    store.dispatch(setPieceId(0));
  }
};

export const linkPieceFormula = async (pieceId: number, formulaId: number) => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "setPieceFormula",
      args: {
        pieceId,
        formulaId,
      },
      res: allPieceFields,
    },
  });
  const res = await sendGQLQuery<{ setPieceFormula: Piece }>(request);
  if (res) {
    setNeedRefresh("piece");
    store.dispatch(setPieceData(res.setPieceFormula));
  }
};
