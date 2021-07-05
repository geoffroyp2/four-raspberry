import { batch } from "react-redux";
import { store } from "@app/store";

import { PointFilter } from "@baseTypes/database/GQLQueryTypes";
import { RecordQueryRes } from "@baseTypes/database/GQLResTypes";

import {
  setRecordData,
  setRecordId,
  setRecordLoadList,
  setRecordNeedsRefresh,
  setRecordPoints,
  setRecordTargetPoints,
} from "../_state/recordDataSlice";
import { setRecordLoadPage, setRecordTotalAmount } from "../_state/recordDisplaySlice";

import { getRecordFieldsQuery, getRecordPageRequest, getRecordPointRequest } from "./queryDocuments";
import client from "@network/apolloClient";

export const loadRecord = async (id: number) => {
  const { data } = await client.query<RecordQueryRes>({ query: getRecordFieldsQuery(id) });

  // If id was not valid
  if (store.getState().recordData.recordId !== 0 && data.records.count === 0) {
    store.dispatch(setRecordId(0));
    return;
  }

  if (data) {
    batch(() => {
      store.dispatch(setRecordData(data.records.rows[0]));
      store.dispatch(setRecordNeedsRefresh(false));
    });
  }
};

export const loadRecordPoints = async (id: number, filter: PointFilter) => {
  const { data } = await client.query<RecordQueryRes>({ query: getRecordPointRequest(id, filter) });
  if (data)
    batch(() => {
      store.dispatch(setRecordPoints(data.records.rows[0]?.points));
      store.dispatch(setRecordTargetPoints(data.records.rows[0]?.target?.points));
    });
};

export const loadRecordList = async (page: number, amount: number) => {
  const { data } = await client.query<RecordQueryRes>({ query: getRecordPageRequest({ page, amount }) });
  if (data) {
    if (page !== 0 && data.records.rows.length === 0) {
      // if current page has no result
      store.dispatch(setRecordLoadPage(0));
    } else {
      batch(() => {
        store.dispatch(setRecordTotalAmount(data.records.count));
        store.dispatch(setRecordLoadList(data.records.rows));
      });
    }
  }
};
