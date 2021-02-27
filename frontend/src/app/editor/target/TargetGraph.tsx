import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectTargetData,
  selectTargetPoints,
  selectTargetTempValues,
  setTargetTempValues,
} from "./_state/targetDataSlice";
import { selectTargetPointZoom } from "./_state/targetDisplaySlice";
import { selectTargetPending, setTargetPending } from "./_state/targetStateSlice";

import PreviewGraph from "@components/PreviewGraph";
import EditorCard from "@components/EditorCard";
import ColorField from "@components/InfoCardElements/ColorField";

import { loadTargetPoints } from "./utils/loadData";
import { saveTargetChanges } from "./utils/editRequests";

const TargetGraph = () => {
  const dispatch = useDispatch();
  const currentTarget = useSelector(selectTargetData);
  const currentTempValues = useSelector(selectTargetTempValues);
  const zoom = useSelector(selectTargetPointZoom);
  const pendingStates = useSelector(selectTargetPending);
  const targetpoints = useSelector(selectTargetPoints);

  // to detect when a new record is loaded
  const [CurrentLoadedId, setCurrentLoadedId] = useState<number>(currentTarget.id || 0);

  useEffect(() => {
    const load = async () => {
      if (currentTarget.id) {
        dispatch(setTargetPending({ points: true }));
        await loadTargetPoints(currentTarget.id, zoom);
        setCurrentLoadedId(currentTarget.id);
        dispatch(setTargetPending({ points: false }));
      }
    };
    if (CurrentLoadedId !== currentTarget.id) load();
  }, [dispatch, currentTarget, zoom, CurrentLoadedId]);

  return (
    <EditorCard>
      <PreviewGraph targetPoints={targetpoints} color={currentTempValues.color} />
      <ColorField
        id={currentTarget.id || 0}
        color={currentTempValues.color}
        setColor={setTargetTempValues}
        validate={saveTargetChanges}
        pending={pendingStates.color}
      />
    </EditorCard>
  );
};

export default TargetGraph;
