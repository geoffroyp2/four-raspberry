import { store } from "@store/store";
import { batch } from "react-redux";
import { setRecordData, setRecordPoints } from "../state/recordDataSlice";
import { fetchRecord, fetchRecordPoints } from "../state/request";

export const loadRecord = async (id: number) => {
  console.log("loading data", id);

  const data = await fetchRecord(id);
  store.dispatch(setRecordData(data.records.rows[0]));
};

export const loadPoints = async (id: number, start: number, end: number, amount: number) => {
  const data = await fetchRecordPoints(id, start, end, amount);
  batch(() => {
    store.dispatch(setRecordPoints(data.records.rows[0]?.points));
  });
};
