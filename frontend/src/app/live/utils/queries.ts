import { gql } from "@apollo/client";
import { store } from "@app/store";
import { TargetFields } from "@baseTypes/database/GQLQueryTypes";
import { TargetQueryRes } from "@baseTypes/database/GQLResTypes";
import client from "@network/apolloClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { batch } from "react-redux";
import { setLiveTarget } from "../_state/liveScreenSlice";

export const targetFields: TargetFields = [
  "id",
  "name",
  "description",
  "oven",
  "createdAt",
  "updatedAt",
  { type: "color", fields: ["r", "g", "b", "a"] },
  {
    type: "points",
    filter: {},
    fields: ["id", "temperature", "oxygen", "time"],
  },
];

export const getTargetFieldsQuery = (id: number) => {
  return gql(
    rootQueryBuilder({
      type: "query",
      query: {
        type: "targets",
        filter: { id: id },
        fields: targetFields,
      },
    })
  );
};

export const loadLiveTarget = async (id: number) => {
  const { data } = await client.query<TargetQueryRes>({ query: getTargetFieldsQuery(id) });
  if (data) {
    batch(() => {
      store.dispatch(setLiveTarget(data.targets.rows[0]));
    });
  }
};
