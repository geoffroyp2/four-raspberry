import React, { useEffect } from "react";
import EditorCard from "@components/EditorCard";
import { selectRecordPointZoom } from "./state/recordDisplaySlice";
import { useDispatch, useSelector } from "react-redux";
import { selectRecordData, selectRecordPoints } from "./state/recordDataSlice";
import PreviewGraph from "@components/PreviewGraph";
import { loadPoints } from "./utils/loadData";
import { selectRecordPending, setRecordPending } from "./state/recordStateSlice";

const RecordGraph = () => {
  const dispatch = useDispatch();
  const currentRecord = useSelector(selectRecordData);
  const zoom = useSelector(selectRecordPointZoom);
  const pendingStates = useSelector(selectRecordPending);

  useEffect(() => {
    const load = async () => {
      if (currentRecord.id) {
        dispatch(setRecordPending({ points: true }));
        await loadPoints(currentRecord.id, zoom.start, zoom.end, zoom.amount);
        dispatch(setRecordPending({ points: false }));
      }
    };
    load();
  }, [dispatch, currentRecord, zoom]);

  return (
    <EditorCard>
      <PreviewGraph points={selectRecordPoints} color={currentRecord.color} />
    </EditorCard>
  );
};

export default RecordGraph;
