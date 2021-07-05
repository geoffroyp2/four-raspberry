import { gql } from "@apollo/client";
import { CommandNameType } from "@baseTypes/database/GQLMutationTypes";

import client from "@network/apolloClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";

export const sendCommand = async (status: CommandNameType, option?: number) => {
  const commandQuery = rootQueryBuilder({
    type: "mutation",
    query: { name: "sendCommand", args: { name: status, option: option ?? null } },
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
