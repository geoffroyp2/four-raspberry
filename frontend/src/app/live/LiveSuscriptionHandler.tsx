import { FC, useEffect } from "react";

import { useSubscription, useLazyQuery } from "@apollo/client";
import { liveSubscription } from "./_gql/subscription";
import { liveRecordQuery, liveTargetQuery } from "./_gql/queries";
import { LiveValuesType, RecordQueryRes, TargetQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectLiveRecord, selectLiveTarget, setLiveTarget, setLiveValues } from "./_state/liveScreenSlice";

import {
  selectLivePointZoom,
  selectLiveRecordId,
  selectLiveRefresh,
  selectLiveTargetId,
  setLiveRecord,
} from "./_state/liveScreenSlice";

import NotFound from "@editor/NotFound";

const LiveSubscriptionHandler: FC = () => {
  const dispatch = useDispatch();

  const record = useSelector(selectLiveRecord);
  const target = useSelector(selectLiveTarget);
  const recordId = useSelector(selectLiveRecordId);
  const targetId = useSelector(selectLiveTargetId);
  const needsRefresh = useSelector(selectLiveRefresh);
  const pointZoom = useSelector(selectLivePointZoom);

  const subscriptionStatus = useSubscription<{ live: LiveValuesType }>(liveSubscription, {
    onSubscriptionData: ({ subscriptionData }) => {
      const liveData = subscriptionData.data?.live;
      if (liveData) {
        dispatch(setLiveValues(liveData));
      }
    },
    shouldResubscribe: true,
    fetchPolicy: "network-only",
  });

  const [loadLiveRecord, liveRecordStatus] = useLazyQuery<RecordQueryRes>(liveRecordQuery(pointZoom), {
    onCompleted: ({ records }) => {
      if (records.rows[0]) {
        dispatch(setLiveRecord(records.rows[0]));
      }
    },
    fetchPolicy: "network-only",
  });

  const [loadLiveTarget, liveTargetStatus] = useLazyQuery<TargetQueryRes>(liveTargetQuery(pointZoom), {
    onCompleted: ({ targets }) => {
      if (targets.rows[0]) {
        dispatch(setLiveTarget(targets.rows[0]));
      }
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (targetId !== null && targetId !== 0 && target.id !== targetId) {
      loadLiveTarget({ variables: { id: targetId } });
    }
  }, [targetId, target, loadLiveTarget]);

  useEffect(() => {
    if (recordId !== null && (needsRefresh || record.id === undefined)) {
      loadLiveRecord({ variables: { id: recordId } });
    }
  }, [recordId, record, needsRefresh, loadLiveRecord]);

  if (liveRecordStatus.error || liveTargetStatus.error || subscriptionStatus.error) return <NotFound />;

  return <></>;
};

export default LiveSubscriptionHandler;
