import EditorCard from "@components/EditorCard";
import PreviewGraph from "@components/PreviewGraph";
import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadLiveRecord, loadLiveTarget } from "./utils/queries";
import {
  selectLiveRecord,
  selectLiveRecordId,
  selectLiveRefresh,
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
  const needsRefresh = useSelector(selectLiveRefresh);

  useEffect(() => {
    if (currentTargetId !== null && currentTargetId !== 0 && target.id !== currentTargetId) {
      loadLiveTarget(currentTargetId);
    }
    if (currentRecordId !== null && (needsRefresh || record.id === undefined)) {
      loadLiveRecord(currentRecordId);
    }
  }, [currentStatus, target.id, record.id, currentTargetId, currentRecordId, needsRefresh]);

  return (
    <EditorCard>
      <PreviewGraph recordPoints={record.points} targetPoints={target.points} color={target.color} />
    </EditorCard>
  );
};

export default LiveGraph;
