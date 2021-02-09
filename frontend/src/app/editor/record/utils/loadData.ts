import { PointFilter } from "@baseTypes/database/GQLQueryTypes";
import { RecordQueryRes } from "@baseTypes/database/GQLResTypes";
import { sendGQLQuery } from "@network/GQLClient";
import { store } from "@app/store";
import { batch } from "react-redux";
import { setRecordData, setRecordLoadList, setRecordPoints } from "../_state/recordDataSlice";
import { setRecordTotalAmount } from "../_state/recordDisplaySlice";
import { getRecordFieldsQuery, getRecordPageRequest, getRecordPointRequest } from "./dataRequests";

export const loadRecord = async (id: number) => {
  const data = await sendGQLQuery<RecordQueryRes>(getRecordFieldsQuery(id));
  store.dispatch(setRecordData(data.records.rows[0]));
};

export const loadRecordPoints = async (id: number, filter: PointFilter) => {
  const data = await sendGQLQuery<RecordQueryRes>(getRecordPointRequest(id, filter));
  batch(() => {
    store.dispatch(setRecordPoints(data.records.rows[0]?.points));
  });
};

export const loadRecordList = async (page: number, amount: number) => {
  const recordRes = await sendGQLQuery<RecordQueryRes>(getRecordPageRequest({ page, amount }));
  batch(() => {
    store.dispatch(setRecordTotalAmount(recordRes.records.count));
    store.dispatch(setRecordLoadList(recordRes.records.rows));
  });
};
