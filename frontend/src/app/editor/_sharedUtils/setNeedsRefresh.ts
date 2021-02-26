import { store } from "@app/store";
import { setRecordNeedsRefresh } from "@editor/record/_state/recordDataSlice";
import { setTargetNeedsRefresh } from "@editor/target/_state/targetDataSlice";

/**
 * Set all needRefresh flags to true. Called after and edit has been made
 */

export const setNeedRefresh = (refresh = true) => {
  store.dispatch(setTargetNeedsRefresh(refresh));
  store.dispatch(setRecordNeedsRefresh(refresh));
};
