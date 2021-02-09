import { store } from "@app/store";
import { sendGQLQuery } from "@network/GQLClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { Record } from "@baseTypes/database/GQLResTypes";
import { setRecordData } from "../_state/recordDataSlice";
import { allRecordFields } from "./dataRequests";

export const saveRecordChanges = async (recordId: number, newData: Record) => {
  console.log(recordId, newData);
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
