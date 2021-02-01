import React from "react";

import { useSelector } from "react-redux";
import { loadTableState, pointEditState } from "@redux/UIControlsSlice";

import ProgramTable from "./ProgramTable";
import InfoCard from "./InfoCard/InfoCard";
import PointEdit from "./InfoCard/PointEdit";
import GraphPreview from "./GraphPreview/GraphPreview";
import PiecesPreview from "./PiecesPreview/PiecesPreview";

import InfoCardButtons from "./Buttons/Zones/InfoCardButtons";
import PointEditModeButtons from "./Buttons/Zones/PointEditModeButtons";
import ProgramTableButtons from "./Buttons/Zones/ProgramTableButtons";
import StartButton from "./Buttons/Zones/StartButton";
import MainZoneLayout from "../Generic/MainZoneLayout";

const ProgramInfo = () => {
  const pointEditMode = useSelector(pointEditState);
  const showLoadTable = useSelector(loadTableState);

  return showLoadTable ? (
    <MainZoneLayout col={1} content={{ left: [<ProgramTable />, <ProgramTableButtons />] }} />
  ) : (
    <MainZoneLayout
      col={2}
      content={{
        left: pointEditMode ? [<PointEdit />, <PointEditModeButtons />] : [<InfoCard />, <InfoCardButtons />],
        right: [<GraphPreview />, <PiecesPreview />, <StartButton />],
      }}
    />
  );
};

export default ProgramInfo;
