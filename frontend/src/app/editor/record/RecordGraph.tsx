import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordPointZoom } from "./state/recordDisplaySlice";
import { selectRecordData, selectRecordPoints } from "./state/recordDataSlice";
import { selectRecordPending, setRecordPending } from "./state/recordStateSlice";

import PreviewGraph from "@components/PreviewGraph";
import EditorCard from "@components/EditorCard";

import { loadPoints } from "./utils/loadData";

const RecordGraph = () => {
  const dispatch = useDispatch();
  const currentRecord = useSelector(selectRecordData);
  const zoom = useSelector(selectRecordPointZoom);
  // const pendingStates = useSelector(selectRecordPending);

  useEffect(() => {
    const load = async () => {
      if (currentRecord.id) {
        dispatch(setRecordPending({ points: true }));
        await loadPoints(currentRecord.id, zoom);
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
