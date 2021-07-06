import gql from "graphql-tag";

import { pieceFieldsString, piecePageFieldsString, piecePreviewFieldsString } from "./fields";

export type PieceQueryParams = {
  variables: {
    id: number;
    name?: string;
  };
};

export const pieceQuery = gql`
  query PieceQueryRes($id: Int, $name: String) {
    pieces(id: $id, name: $name) {
      count
      rows {
        ${pieceFieldsString}
      }
    }
  }
`;

export const piecePageQuery = gql`
  query PieceQueryRes($page: Int, $amount: Int, $name: String)  {
    pieces(page: $page, amount: $amount, name: $name) {
      count
      rows {
        ${piecePageFieldsString}
      }
    }
  }
`;

export const piecePreviewQuery = gql`
  query PieceQueryRes($id: Int) {
    pieces(id: $id) {
      count
      rows {
        ${piecePreviewFieldsString}
      }
    }
  }
`;
