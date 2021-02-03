import { TargetFilter } from "@baseTypes/database/GQLQueryFields";
import { RecordRootRes } from "@baseTypes/database/GQLResTypes";
import { rootQuery } from "@network/GQLClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";

const RecordDataRequest = (id: number): string => {
  return rootQueryBuilder("query", {
    rootType: "records",
    filter: [{ id: "id", arg: id }],
    fields: {
      simple: ["id", "name", "description", "oven", "createdAt", "updatedAt"],
      composed: [
        {
          field: "pieces",
          args: {
            simple: ["id", "name"],
            composed: [],
          },
        },
        {
          field: "target",
          args: {
            simple: ["id", "name"],
            composed: [],
          },
        },
      ],
    },
  });
};

const recordPageRequest = (page?: number, amount?: number) => {
  const filter: TargetFilter[] = [];
  if (page !== undefined) filter.push({ id: "page", arg: page });
  if (amount !== undefined) filter.push({ id: "amount", arg: amount });

  return rootQueryBuilder("query", {
    rootType: "records",
    filter: filter,
    fields: {
      simple: ["id", "name", "description", "oven", "createdAt", "updatedAt"],
      composed: [
        {
          field: "target",
          args: {
            simple: ["id", "name"],
            composed: [],
          },
        },
      ],
    },
  });
};

/**
 * Relay functions used to enforce types
 */
export const fetchRecord = async (id: number): Promise<RecordRootRes> =>
  rootQuery(RecordDataRequest(id)) as Promise<RecordRootRes>;
export const fetchRecordPage = async (page?: number, amount?: number): Promise<RecordRootRes> =>
  rootQuery(recordPageRequest(page, amount)) as Promise<RecordRootRes>;
