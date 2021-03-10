import EditorCard from "@components/EditorCard";
import PreviewGraph from "@components/PreviewGraph";
import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadLiveTarget } from "./utils/queries";
import {
  selectLiveRecord,
  selectLiveRecordId,
  selectLiveStatus,
  selectLiveTarget,
  selectLiveTargetId,
} from "./_state/liveScreenSlice";

const LiveGraph: FC = () => {
  const record = useSelector(selectLiveRecord);
  const target = useSelector(selectLiveTarget);
  const currentStatus = useSelector(selectLiveStatus);
  const currentTargetId = useSelector(selectLiveTargetId);
  const currentRecordId = useSelector(selectLiveRecordId);

  useEffect(() => {
    if (currentTargetId !== 0 && target.id !== currentTargetId) {
      loadLiveTarget(currentTargetId);
    }
    if (currentRecordId !== null) {
      // Load record points
    }
  }, [currentStatus, target.id, currentTargetId, currentRecordId]);

  return (
    <EditorCard>
      <PreviewGraph recordPoints={record.points} targetPoints={target.points} color={target.color} />
    </EditorCard>
  );
};

export default LiveGraph;
