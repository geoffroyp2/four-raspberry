import { FC } from "react";

import { useSelector } from "react-redux";
import {
  selectLiveMonitoring,
  selectLiveProgramTime,
  selectLiveSensorValues,
  selectLiveStatus,
  selectLiveTargetId,
} from "./_state/liveScreenSlice";

import InfosCard, { InfosCardField } from "@components/cards/InfosCard";

import { formatTime } from "@app/_utils/timeFormat";

const LiveInfos: FC = () => {
  const currentTargetId = useSelector(selectLiveTargetId);
  const sensorValues = useSelector(selectLiveSensorValues);
  const currentStatus = useSelector(selectLiveStatus);
  const programTime = useSelector(selectLiveProgramTime);
  const monitoring = useSelector(selectLiveMonitoring);

  return (
    <>
      <InfosCard>
        <InfosCardField label="Courbe de référence" defaultContent={currentTargetId ?? "-"} />
        <InfosCardField label="Status" defaultContent={currentStatus} />
        <InfosCardField label="Oxygène" defaultContent={sensorValues.oxygen.toFixed(2)} />
        <InfosCardField label="Température" defaultContent={sensorValues.temperature.toFixed(2)} />
        <InfosCardField label="Temps du programme" defaultContent={formatTime(programTime)} />
        <InfosCardField label="Monitoring" defaultContent={monitoring ? "Activé" : "Désactivé"} />
      </InfosCard>
    </>
  );
};

export default LiveInfos;
