import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordPointZoom } from "./_state/recordDisplaySlice";
import {
  selectRecordData,
  selectRecordPoints,
  selectRecordTempValues,
  setRecordTempValues,
} from "./_state/recordDataSlice";
import { selectRecordPending, setRecordPending } from "./_state/recordStateSlice";

import PreviewGraph from "@components/PreviewGraph";
import EditorCard from "@components/EditorCard";
import ColorField from "@components/InfoCardElements/ColorField";

import { loadRecordPoints } from "./utils/loadData";
import { saveRecordChanges } from "./utils/editRequests";

const RecordGraph = () => {
  const dispatch = useDispatch();
  const currentRecord = useSelector(selectRecordData);
  const currentTempValues = useSelector(selectRecordTempValues);
  const zoom = useSelector(selectRecordPointZoom);
  const pendingStates = useSelector(selectRecordPending);

  useEffect(() => {
    const load = async () => {
      if (currentRecord.id) {
        dispatch(setRecordPending({ points: true }));
        await loadRecordPoints(currentRecord.id, zoom);
        dispatch(setRecordPending({ points: false }));
      }
    };
    load();
  }, [dispatch, currentRecord, zoom]);

  return (
    <EditorCard>
      <PreviewGraph points={selectRecordPoints} color={currentTempValues.color} />
      <ColorField
        id={currentRecord.id || 0}
        color={currentTempValues.color}
        setColor={setRecordTempValues}
        validate={saveRecordChanges}
        pending={pendingStates.color}
      />
    </EditorCard>
  );
};

export default RecordGraph;
