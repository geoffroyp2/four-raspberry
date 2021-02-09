import { store } from "@app/store";
import { sendGQLQuery } from "@network/GQLClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { Record } from "@baseTypes/database/GQLResTypes";
import { setRecordData } from "../_state/recordDataSlice";
import { allRecordFields } from "./dataRequests";

export const saveRecordChanges = async (recordId: number, newData: Record) => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "updateRecord",
      args: {
        recordId,
        ...newData,
      },
      res: allRecordFields,
    },
  });
  const res = await sendGQLQuery<{ updateRecord: Record }>(request);
  store.dispatch(setRecordData(res.updateRecord));
};

export const linkRecordTarget = async (recordId: number, targetId: number) => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "setRecordTarget",
      args: {
        recordId,
        targetId,
      },
      res: allRecordFields,
    },
  });
  const res = await sendGQLQuery<{ setRecordTarget: Record }>(request);
  store.dispatch(setRecordData(res.setRecordTarget));
};
