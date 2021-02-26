import { store } from "@app/store";
import { sendGQLQuery } from "@network/GQLClient";
import rootQueryBuilder from "@utils/GQLQueryBuilder";
import { Record } from "@baseTypes/database/GQLResTypes";
import { setRecordData, setRecordId } from "../_state/recordDataSlice";
import { allRecordFields } from "./dataRequests";
import { setNeedRefresh } from "@editor/_sharedUtils/setNeedsRefresh";

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
  if (res) {
    setNeedRefresh("record");
    store.dispatch(setRecordData(res.updateRecord));
  }
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
  if (res) {
    setNeedRefresh("record");
    store.dispatch(setRecordData(res.setRecordTarget));
  }
};

export const createRecord = async () => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "createRecord",
      args: {},
      res: allRecordFields,
    },
  });
  const res = await sendGQLQuery<{ createRecord: Record }>(request);
  if (res) {
    setNeedRefresh("record");
    store.dispatch(setRecordData(res.createRecord));
  }
};

export const deleteRecord = async (recordId: number) => {
  const request = rootQueryBuilder({
    type: "mutation",
    query: {
      name: "deleteRecord",
      args: { recordId },
    },
  });
  const res = await sendGQLQuery<{ deleteRecord: boolean }>(request);
  if (res) {
    setNeedRefresh("record");
    store.dispatch(setRecordId(0));
  }
};
