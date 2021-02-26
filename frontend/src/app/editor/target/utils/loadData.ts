import { batch } from "react-redux";
import { store } from "@app/store";
import { sendGQLQuery } from "@network/GQLClient";

import { PointFilter } from "@baseTypes/database/GQLQueryTypes";
import { TargetQueryRes } from "@baseTypes/database/GQLResTypes";

import { setTargetData, setTargetLoadList, setTargetNeedsRefresh, setTargetPoints } from "../_state/targetDataSlice";
import { setTargetLoadPage, setTargetTotalAmount } from "../_state/targetDisplaySlice";

import { getTargetFieldsQuery, getTargetPageRequest, getTargetPointRequest } from "./dataRequests";

export const loadTarget = async (id: number) => {
  const res = await sendGQLQuery<TargetQueryRes>(getTargetFieldsQuery(id));
  if (res) {
    batch(() => {
      store.dispatch(setTargetData(res.targets.rows[0]));
      store.dispatch(setTargetNeedsRefresh(false));
    });
  }
};

export const loadTargetPoints = async (id: number, filter: PointFilter) => {
  const res = await sendGQLQuery<TargetQueryRes>(getTargetPointRequest(id, filter));
  if (res)
    batch(() => {
      store.dispatch(setTargetPoints(res.targets.rows[0]?.points));
    });
};

export const loadTargetList = async (page: number, amount: number) => {
  const res = await sendGQLQuery<TargetQueryRes>(getTargetPageRequest({ page, amount }));
  if (res) {
    if (page !== 0 && res.targets.rows.length === 0) {
      // if current page has no result
      store.dispatch(setTargetLoadPage(0));
    } else {
      batch(() => {
        store.dispatch(setTargetTotalAmount(res.targets.count));
        store.dispatch(setTargetLoadList(res.targets.rows));
      });
    }
  }
};
