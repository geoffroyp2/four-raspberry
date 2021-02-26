import { batch } from "react-redux";
import { store } from "@app/store";
import { sendGQLQuery } from "@network/GQLClient";

import { PointFilter } from "@baseTypes/database/GQLQueryTypes";
import { RecordQueryRes } from "@baseTypes/database/GQLResTypes";

import { setRecordData, setRecordLoadList, setRecordNeedsRefresh, setRecordPoints } from "../_state/recordDataSlice";
import { setRecordLoadPage, setRecordTotalAmount } from "../_state/recordDisplaySlice";

import { getRecordFieldsQuery, getRecordPageRequest, getRecordPointRequest } from "./dataRequests";

export const loadRecord = async (id: number) => {
  const res = await sendGQLQuery<RecordQueryRes>(getRecordFieldsQuery(id));
  if (res) {
    batch(() => {
      store.dispatch(setRecordData(res.records.rows[0]));
      store.dispatch(setRecordNeedsRefresh(false));
    });
  }
};

export const loadRecordPoints = async (id: number, filter: PointFilter) => {
  const res = await sendGQLQuery<RecordQueryRes>(getRecordPointRequest(id, filter));
  if (res)
    batch(() => {
      store.dispatch(setRecordPoints(res.records.rows[0]?.points));
    });
};

export const loadRecordList = async (page: number, amount: number) => {
  const res = await sendGQLQuery<RecordQueryRes>(getRecordPageRequest({ page, amount }));
  if (res) {
    if (page !== 0 && res.records.rows.length === 0) {
      // if current page has no result
      store.dispatch(setRecordLoadPage(0));
    } else {
      batch(() => {
        store.dispatch(setRecordTotalAmount(res.records.count));
        store.dispatch(setRecordLoadList(res.records.rows));
      });
    }
  }
};
