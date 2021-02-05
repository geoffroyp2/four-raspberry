import { store } from "@store/store";
import { setRecordData } from "../state/recordDataSlice";
import { fetchRecord } from "../state/request";

export const loadRecord = async (id: number) => {
  console.log("loading data", id);

  const data = await fetchRecord(id);
  store.dispatch(setRecordData(data.records.rows[0]));
};
