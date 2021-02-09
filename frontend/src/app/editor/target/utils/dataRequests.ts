import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { PageFilter, PointFilter, TargetFields } from "@baseTypes/database/GQLQueryTypes";

export const allTargetFields: TargetFields = [
  "id",
  "name",
  "description",
  "oven",
  "createdAt",
  "updatedAt",
  {
    type: "records",
    fields: ["id", "name"],
  },
  { type: "color", fields: ["r", "g", "b", "a"] },
  { type: "pieces", fields: ["id", "name", { type: "formula", fields: ["name"] }] },
];

export const getTargetFieldsQuery = (id: number): string => {
  return rootQueryBuilder({
    type: "query",
    query: {
      type: "targets",
      filter: { id: id },
      fields: allTargetFields,
    },
  });
};

export const getTargetPageRequest = (filter: PageFilter) => {
  return rootQueryBuilder({
    type: "query",
    query: {
      type: "targets",
      filter: filter,
      fields: ["id", "name", "description", "oven", "createdAt", "updatedAt"],
    },
  });
};

export const getTargetPointRequest = (id: number, filter: PointFilter) => {
  return rootQueryBuilder({
    type: "query",
    query: {
      type: "targets",
      filter: { id: id },
      fields: [
        {
          type: "points",
          filter: filter,
          fields: ["id", "temperature", "oxygen", "time"],
        },
      ],
    },
  });
};
