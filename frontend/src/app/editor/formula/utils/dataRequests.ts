import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { PageFilter, FormulaFields } from "@baseTypes/database/GQLQueryTypes";

export const allFormulaFields: FormulaFields = [
  "id",
  "name",
  "description",
  "createdAt",
  "updatedAt",
  {
    type: "pieces",
    fields: ["id", "name"],
  },
  { type: "ingredients", fields: ["amount", { type: "chemical", fields: ["id", "name", "chemicalName"] }] },
];

export const getFormulaFieldsQuery = (id: number) => {
  return rootQueryBuilder({
    type: "query",
    query: {
      type: "formulas",
      filter: { id: id },
      fields: allFormulaFields,
    },
  });
};

export const getFormulaPageRequest = (filter: PageFilter) => {
  return rootQueryBuilder({
    type: "query",
    query: {
      type: "formulas",
      filter: filter,
      fields: ["id", "name", "description", "createdAt", "updatedAt"],
    },
  });
};
