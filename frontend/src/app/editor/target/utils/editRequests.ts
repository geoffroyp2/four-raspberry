import { store } from "@app/store";
import { sendGQLQuery } from "@network/GQLClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { Target } from "@baseTypes/database/GQLResTypes";
import { allTargetFields } from "./dataRequests";
import { setTargetData } from "../state/targetDataSlice";

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
  store.dispatch(setTargetData(res.updateTarget));
};
