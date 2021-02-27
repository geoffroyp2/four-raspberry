import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordPointZoom } from "./_state/recordDisplaySlice";
import {
  selectRecordData,
  selectRecordPoints,
  selectRecordTargetPoints,
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
  const recordPoints = useSelector(selectRecordPoints);
  const targetpoints = useSelector(selectRecordTargetPoints);

  // to detect when a new record is loaded
  const [CurrentLoadedId, setCurrentLoadedId] = useState<number>(currentRecord.id || 0);

  useEffect(() => {
    const load = async () => {
      if (currentRecord.id) {
        dispatch(setRecordPending({ points: true }));
        await loadRecordPoints(currentRecord.id, zoom);
        setCurrentLoadedId(currentRecord.id);
        dispatch(setRecordPending({ points: false }));
      }
    };
    if (CurrentLoadedId !== currentRecord.id) load();
  }, [dispatch, currentRecord, zoom, CurrentLoadedId]);

  return (
    <EditorCard>
      {!pendingStates.data && !pendingStates.points && (
        <>
          <PreviewGraph recordPoints={recordPoints} targetPoints={targetpoints} color={currentTempValues.color} />
          <ColorField
            id={currentRecord.id || 0}
            color={currentTempValues.color}
            setColor={setRecordTempValues}
            validate={saveRecordChanges}
            pending={pendingStates.color}
          />
        </>
      )}
    </EditorCard>
  );
};

export default RecordGraph;
