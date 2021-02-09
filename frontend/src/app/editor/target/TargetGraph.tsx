import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectTargetData,
  selectTargetPoints,
  selectTargetTempValues,
  setTargetTempValues,
} from "./state/targetDataSlice";
import { selectTargetPointZoom } from "./state/targetDisplaySlice";
import { selectTargetPending, setTargetPending } from "./state/targetStateSlice";

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

  useEffect(() => {
    const load = async () => {
      if (currentTarget.id) {
        dispatch(setTargetPending({ points: true }));
        await loadTargetPoints(currentTarget.id, zoom);
        dispatch(setTargetPending({ points: false }));
      }
    };
    load();
  }, [dispatch, currentTarget, zoom]);

  return (
    <EditorCard>
      <PreviewGraph points={selectTargetPoints} color={currentTempValues.color} />
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
