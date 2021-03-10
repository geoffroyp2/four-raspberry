import { gql } from "@apollo/client";
import { LiveStatusType } from "@baseTypes/database/GQLMutationTypes";

import client from "@network/apolloClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";

export const sendCommand = async (status: LiveStatusType) => {
  const commandQuery = rootQueryBuilder({
    type: "mutation",
    query: { name: "updateStatus", args: { status } },
  });
  return client.mutate({ mutation: gql(commandQuery) });
};

export const updateTargetId = async (targetId: number) => {
  const updateQuery = rootQueryBuilder({
    type: "mutation",
    query: { name: "updateLiveTargetId", args: { targetId } },
  });
  return client.mutate({ mutation: gql(updateQuery) });
};
