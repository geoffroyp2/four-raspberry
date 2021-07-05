import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { PageFilter, PieceFields } from "@baseTypes/database/GQLQueryTypes";
import { gql } from "@apollo/client";

export const allPieceFields: PieceFields = [
  "id",
  "name",
  "description",
  "photos",
  "createdAt",
  "updatedAt",
  {
    type: "records",
    fields: ["id", "name", "oven"],
  },
  { type: "formula", fields: ["id", "name"] },
];

export const getPieceFieldsQuery = (id: number) => {
  return gql(
    rootQueryBuilder({
      type: "query",
      query: {
        type: "pieces",
        filter: { id: id },
        fields: allPieceFields,
      },
    })
  );
};

export const getPiecePageRequest = (filter: PageFilter) => {
  return gql(
    rootQueryBuilder({
      type: "query",
      query: {
        type: "pieces",
        filter: filter,
        fields: [
          "id",
          "name",
          "description",
          "createdAt",
          "updatedAt",
          {
            type: "formula",
            fields: ["id", "name"],
          },
        ],
      },
    })
  );
};
