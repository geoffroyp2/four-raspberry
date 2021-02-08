import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { PageFilter, PointFilter, RecordFields } from "@baseTypes/database/GQLQueryTypes";

export const allRecordFields: RecordFields = [
  "id",
  "name",
  "description",
  "oven",
  "createdAt",
  "updatedAt",
  {
    type: "target",
    fields: ["id", "name"],
  },
  { type: "color", fields: ["r", "g", "b", "a"] },
  { type: "pieces", fields: ["id", "name"] },
];

export const getRecordFieldsQuery = (id: number): string => {
  return rootQueryBuilder({
    type: "query",
    query: {
      type: "records",
      filter: { id: id },
      fields: allRecordFields,
    },
  });
};

export const getRecordPageRequest = (filter: PageFilter) => {
  return rootQueryBuilder({
    type: "query",
    query: {
      type: "records",
      filter: filter,
      fields: [
        "id",
        "name",
        "description",
        "oven",
        "createdAt",
        "updatedAt",
        {
          type: "target",
          fields: ["id", "name"],
        },
      ],
    },
  });
};

export const getRecordPointRequest = (id: number, filter: PointFilter) => {
  return rootQueryBuilder({
    type: "query",
    query: {
      type: "records",
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
