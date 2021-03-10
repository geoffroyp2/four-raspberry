import { gql } from "@apollo/client";
import client from "@network/apolloClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { allTargetFields } from "./queryDocuments";

import { store } from "@app/store";
import { setNeedRefresh } from "@editor/_shared/setNeedsRefresh";
import { setTargetData, setTargetId } from "../_state/targetDataSlice";

import { Target } from "@baseTypes/database/GQLResTypes";

export const saveTargetChanges = async (targetId: number, newData: Target) => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "updateTarget",
        args: {
          targetId,
          ...newData,
        },
        res: allTargetFields,
      },
    })
  );
  const { data } = await client.mutate<{ updateTarget: Target }>({ mutation });
  if (data) {
    setNeedRefresh("target");
    store.dispatch(setTargetData(data.updateTarget));
  }
};

export const createTarget = async () => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "createTarget",
        args: {},
        res: allTargetFields,
      },
    })
  );
  const { data } = await client.mutate<{ createTarget: Target }>({ mutation });
  if (data) {
    setNeedRefresh("target");
    store.dispatch(setTargetData(data.createTarget));
  }
};

export const deleteTarget = async (targetId: number) => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "deleteTarget",
        args: { targetId },
      },
    })
  );
  const { data } = await client.mutate<{ deleteTarget: boolean }>({ mutation });
  if (data) {
    setNeedRefresh("target");
    store.dispatch(setTargetId(0));
  }
};
