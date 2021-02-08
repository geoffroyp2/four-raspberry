import { rootQuery } from "@network/GQLClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { RecordRootRes } from "@baseTypes/database/GQLResTypes";
import { PageFilter, PointFilter } from "@baseTypes/database/GQLQueryTypes";

const RecordDataRequest = (id: number): string => {
  return rootQueryBuilder("query", {
    type: "records",
    filter: { id: id },
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
      { type: "color", fields: ["r", "g", "b", "a"] },
      { type: "pieces", fields: ["id", "name"] },
    ],
  });
};

const recordPageRequest = (filter: PageFilter) => {
  return rootQueryBuilder("query", {
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
  });
};

const recordPointRequest = (id: number, filter: PointFilter) => {
  return rootQueryBuilder("query", {
    type: "records",
    filter: { id: id },
    fields: [
      {
        type: "points",
        filter: filter,
        fields: ["id", "temperature", "oxygen", "time"],
      },
    ],
  });
};

/**
 * Relay functions used to enforce types
 */
export const fetchRecord = async (id: number): Promise<RecordRootRes> =>
  rootQuery(RecordDataRequest(id)) as Promise<RecordRootRes>;
export const fetchRecordPage = async (filter: PageFilter): Promise<RecordRootRes> =>
  rootQuery(recordPageRequest(filter)) as Promise<RecordRootRes>;
export const fetchRecordPoints = async (id: number, filter: PointFilter): Promise<RecordRootRes> =>
  rootQuery(recordPointRequest(id, filter)) as Promise<RecordRootRes>;
