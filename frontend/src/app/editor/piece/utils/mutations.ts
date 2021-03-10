import { store } from "@app/store";
import { setNeedRefresh } from "@editor/_shared/setNeedsRefresh";
import { setPieceData, setPieceId } from "../_state/pieceDataSlice";

import { Piece } from "@baseTypes/database/GQLResTypes";
import { allPieceFields } from "./queryDocuments";

import { gql } from "@apollo/client";
import client from "@network/apolloClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";

export const savePieceChanges = async (pieceId: number, newData: Piece) => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "updatePiece",
        args: {
          pieceId,
          ...newData,
        },
        res: allPieceFields,
      },
    })
  );
  const { data } = await client.mutate<{ updatePiece: Piece }>({ mutation });
  if (data) {
    setNeedRefresh("piece");
    store.dispatch(setPieceData(data.updatePiece));
  }
};

export const createPiece = async () => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "createPiece",
        args: {},
        res: allPieceFields,
      },
    })
  );
  const { data } = await client.mutate<{ createPiece: Piece }>({ mutation });
  if (data) {
    setNeedRefresh("piece");
    store.dispatch(setPieceData(data.createPiece));
  }
};

export const deletePiece = async (pieceId: number) => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "deletePiece",
        args: { pieceId },
      },
    })
  );
  const { data } = await client.mutate<{ deletePiece: boolean }>({ mutation });
  if (data) {
    setNeedRefresh("piece");
    store.dispatch(setPieceId(0));
  }
};

export const linkPieceFormula = async (pieceId: number, formulaId: number) => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "setPieceFormula",
        args: {
          pieceId,
          formulaId,
        },
        res: allPieceFields,
      },
    })
  );
  const { data } = await client.mutate<{ setPieceFormula: Piece }>({ mutation });
  if (data) {
    setNeedRefresh("piece");
    store.dispatch(setPieceData(data.setPieceFormula));
  }
};
