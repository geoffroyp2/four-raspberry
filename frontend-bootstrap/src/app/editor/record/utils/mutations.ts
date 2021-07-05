import client from "@network/apolloClient";
import { gql } from "@apollo/client";
import rootQueryBuilder from "@utils/GQLQueryBuilder";

import { store } from "@app/store";
import { setRecordData, setRecordId } from "../_state/recordDataSlice";

import { setNeedRefresh } from "@editor/_shared/setNeedsRefresh";
import { allRecordFields } from "./queryDocuments";
import { Record } from "@baseTypes/database/GQLResTypes";

export const saveRecordChanges = async (recordId: number, newData: Record) => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "updateRecord",
        args: {
          recordId,
          ...newData,
        },
        res: allRecordFields,
      },
    })
  );
  const { data } = await client.mutate<{ updateRecord: Record }>({ mutation });
  if (data) {
    store.dispatch(setRecordData(data.updateRecord));
    setNeedRefresh("record");
  }
};

export const linkRecordTarget = async (recordId: number, targetId: number) => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "setRecordTarget",
        args: {
          recordId,
          targetId,
        },
        res: allRecordFields,
      },
    })
  );
  const { data } = await client.mutate<{ setRecordTarget: Record }>({ mutation });
  if (data) {
    store.dispatch(setRecordData(data.setRecordTarget));
    setNeedRefresh("record");
  }
};

export const createRecord = async () => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "createRecord",
        args: {},
        res: allRecordFields,
      },
    })
  );
  const { data } = await client.mutate<{ createRecord: Record }>({ mutation });
  if (data) {
    store.dispatch(setRecordData(data.createRecord));
    setNeedRefresh("record");
  }
};

export const deleteRecord = async (recordId: number) => {
  const mutation = gql(
    rootQueryBuilder({
      type: "mutation",
      query: {
        name: "deleteRecord",
        args: { recordId },
      },
    })
  );
  const { data } = await client.mutate<{ deleteRecord: boolean }>({ mutation });
  if (data) {
    store.dispatch(setRecordId(0));
    setNeedRefresh();
  }
};
