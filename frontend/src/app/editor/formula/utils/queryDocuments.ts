import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { PageFilter, FormulaFields } from "@baseTypes/database/GQLQueryTypes";
import { gql } from "@apollo/client";

export const allFormulaFields: FormulaFields = [
  "id",
  "name",
  "description",
  "createdAt",
  "updatedAt",
  {
    type: "target",
    fields: ["id", "name", "oven"],
  },
  {
    type: "pieces",
    fields: ["id", "name", "photos"],
  },
  {
    type: "ingredients",
    fields: [
      "amount",
      {
        type: "chemical",
        fields: [
          "id",
          "name",
          "chemicalName",
          "currentVersion",
          "existingVersions",
          { type: "color", fields: ["r", "g", "b", "a"] },
        ],
      },
    ],
  },
];

export const getFormulaFieldsQuery = (id: number) => {
  return gql(
    rootQueryBuilder({
      type: "query",
      query: {
        type: "formulas",
        filter: { id: id },
        fields: allFormulaFields,
      },
    })
  );
};

export const getFormulaPageRequest = (filter: PageFilter) => {
  return gql(
    rootQueryBuilder({
      type: "query",
      query: {
        type: "formulas",
        filter: filter,
        fields: ["id", "name", "description", "createdAt", "updatedAt"],
      },
    })
  );
};
