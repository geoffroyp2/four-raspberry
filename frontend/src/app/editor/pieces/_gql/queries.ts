import { PageQueryParams } from "@editor/_gql/types";
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

export type PieceSortParams = {
  sortBy: "name" | "id" | "createdAt" | "updatedAt" | "formula";
  order: "ASC" | "DESC";
};
export type PiecePageQueryParams = PageQueryParams & { variables: { sort?: PieceSortParams } };

export const piecePageQuery = gql`
  query PieceQueryRes($page: Int, $amount: Int, $name: String, $sort: SortInput)  {
    pieces(page: $page, amount: $amount, name: $name, sort: $sort) {
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
