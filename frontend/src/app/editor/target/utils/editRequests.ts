import { store } from "@app/store";
import { sendGQLQuery } from "@network/GQLClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { Target } from "@baseTypes/database/GQLResTypes";
import { allTargetFields } from "./dataRequests";
import { setTargetData, setTargetId } from "../_state/targetDataSlice";

export const saveTargetChanges = async (targetId: number, newData: Target) => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "updateTarget",
      args: {
        targetId,
        ...newData,
      },
      res: allTargetFields,
    },
  });
  const res = await sendGQLQuery<{ updateTarget: Target }>(request);
  if (res) store.dispatch(setTargetData(res.updateTarget));
};

export const createTarget = async () => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "createTarget",
      args: {},
      res: allTargetFields,
    },
  });
  const res = await sendGQLQuery<{ createTarget: Target }>(request);
  if (res) store.dispatch(setTargetData(res.createTarget));
};

export const deleteTarget = async (targetId: number) => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "deleteTarget",
      args: { targetId },
    },
  });
  const res = await sendGQLQuery<{ deleteTarget: boolean }>(request);
  if (res) store.dispatch(setTargetId(0));
};
