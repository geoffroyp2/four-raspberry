import { store } from "@app/store";
import { setRecordNeedsRefresh } from "@editor/record/_state/recordDataSlice";
import { setTargetNeedsRefresh } from "@editor/target/_state/targetDataSlice";
import { ScreenType } from "@navBar/MainNavSlice";

/**
 * Set all needRefresh flags to true. Called after and edit has been made
 */

export const setNeedRefresh = (screenToExclude: ScreenType) => {
  if (screenToExclude !== "target") store.dispatch(setTargetNeedsRefresh(true));
  if (screenToExclude !== "piece") store.dispatch(setRecordNeedsRefresh(true));
};
