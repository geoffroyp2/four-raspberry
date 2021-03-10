import client from "@network/apolloClient";
import { batch } from "react-redux";
import { store } from "@app/store";

import { PointFilter } from "@baseTypes/database/GQLQueryTypes";
import { TargetQueryRes } from "@baseTypes/database/GQLResTypes";

import { setTargetData, setTargetLoadList, setTargetNeedsRefresh, setTargetPoints } from "../_state/targetDataSlice";
import { setTargetLoadPage, setTargetTotalAmount } from "../_state/targetDisplaySlice";

import { getTargetFieldsQuery, getTargetPageRequest, getTargetPointRequest } from "./queryDocuments";

export const loadTarget = async (id: number) => {
  const { data } = await client.query<TargetQueryRes>({ query: getTargetFieldsQuery(id) });
  if (data) {
    batch(() => {
      store.dispatch(setTargetData(data.targets.rows[0]));
      store.dispatch(setTargetNeedsRefresh(false));
    });
  }
};

export const loadTargetPoints = async (id: number, filter: PointFilter) => {
  const { data } = await client.query<TargetQueryRes>({ query: getTargetPointRequest(id, filter) });
  if (data)
    batch(() => {
      store.dispatch(setTargetPoints(data.targets.rows[0]?.points));
    });
};

export const loadTargetList = async (page: number, amount: number) => {
  const { data } = await client.query<TargetQueryRes>({ query: getTargetPageRequest({ page, amount }) });
  if (data) {
    if (page !== 0 && data.targets.rows.length === 0) {
      // if current page has no result
      store.dispatch(setTargetLoadPage(0));
    } else {
      batch(() => {
        store.dispatch(setTargetTotalAmount(data.targets.count));
        store.dispatch(setTargetLoadList(data.targets.rows));
      });
    }
  }
};
