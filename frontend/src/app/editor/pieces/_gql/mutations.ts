import gql from "graphql-tag";
import { pieceFieldsString } from "./fields";

const updatePieceFields = {
  name: "$name: String",
  description: "$description: String",
};

export const getUpdatePieceMutation = (field: keyof typeof updatePieceFields) => gql`
    mutation updatePiece($pieceId: Int!, ${updatePieceFields[field]}) {
      updatePiece(pieceId: $pieceId, ${field}:$${field}) {
        ${pieceFieldsString}
      }
    }
  `;
