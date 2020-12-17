import React from "react";

import { useSelector } from "react-redux";
import { LoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";

import MainZoneLayout from "@UIGeneric/MainZoneLayout";

import RecordLoadTable from "./RecordLoadTable";
import RecordInfoCard from "./Zones/InfoCard";
import RecordInfoCardButtons from "./Zones/InfoCardButtons";
import RecordGraphPreview from "./Zones/GraphPreview";
import RecordPieceList from "./Zones/PieceList";

const RecordTab = () => {
  const showLoadTable = useSelector(LoadTableShow);
  // const pointEditMode = useSelector(RecordPointEditMode);

  return showLoadTable ? (
    <RecordLoadTable />
  ) : (
    <MainZoneLayout
      left={
        //pointEditMode ? [<PointEdit />, <PointEditModeButtons />] :
        [<RecordInfoCard />, <RecordInfoCardButtons />]
      }
      right={[<RecordGraphPreview />, <RecordPieceList />]}
    />
  );
};

export default RecordTab;
