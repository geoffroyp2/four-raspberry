import { batch } from "react-redux";
import { store } from "@app/store";
import { sendGQLQuery } from "@network/GQLClient";

import { PointFilter } from "@baseTypes/database/GQLQueryTypes";
import { TargetQueryRes } from "@baseTypes/database/GQLResTypes";

import { setTargetData, setTargetLoadList, setTargetPoints } from "../_state/targetDataSlice";
import { setTargetTotalAmount } from "../_state/targetDisplaySlice";

import { getTargetFieldsQuery, getTargetPageRequest, getTargetPointRequest } from "./dataRequests";

export const loadTarget = async (id: number) => {
  const data = await sendGQLQuery<TargetQueryRes>(getTargetFieldsQuery(id));
  store.dispatch(setTargetData(data.targets.rows[0]));
};

export const loadTargetPoints = async (id: number, filter: PointFilter) => {
  const data = await sendGQLQuery<TargetQueryRes>(getTargetPointRequest(id, filter));
  batch(() => {
    store.dispatch(setTargetPoints(data.targets.rows[0]?.points));
  });
};

export const loadTargetList = async (page: number, amount: number) => {
  const data = await sendGQLQuery<TargetQueryRes>(getTargetPageRequest({ page, amount }));
  batch(() => {
    store.dispatch(setTargetTotalAmount(data.targets.count));
    store.dispatch(setTargetLoadList(data.targets.rows));
  });
};
