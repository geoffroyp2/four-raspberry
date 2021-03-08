import { gql } from "@apollo/client";
import client from "@network/apolloClient";

import { store } from "@app/store";
import { setLiveValues, LiveValuesType } from "../liveScreenSlice";

import rootQueryBuilder from "@utils/GQLQueryBuilder";

const subscriptionQuery = rootQueryBuilder({
  type: "subscription",
  query: {
    type: "live",
    fields: [
      "status",
      "currentTargetId",
      {
        type: "sensors",
        fields: ["oxygen", "temperature"],
      },
    ],
  },
});

const observable = client.subscribe({ query: gql(subscriptionQuery) });

const isLiveValue = (data: any): data is LiveValuesType => {
  return data.__typename === "LiveValues";
};

export const subscribe = () => {
  observable.subscribe({
    next: ({ data }) => {
      if (isLiveValue(data.live)) {
        store.dispatch(setLiveValues(data.live));
      }
    },
    error: console.error,
  });
};
