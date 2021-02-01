import React from "react";

import { useSelector } from "react-redux";
import { LoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";
import { RecordPointEditMode } from "@redux/displayStateReducers/recordDisplaySlice";

import MainZoneLayout from "@UIGeneric/MainZoneLayout";

import RecordLoadTable from "./RecordLoadTable";
import RecordInfoCard from "./Zones/InfoCard";
import RecordInfoCardButtons from "./Zones/InfoCardButtons";
import RecordGraphPreview from "./Zones/GraphPreview";
import RecordPieceList from "./Zones/PieceList";
import RecordPointEdit from "./Zones/PointEdit";
import RecordPointEditButtons from "./Zones/PointEditButtons";

const RecordTab = () => {
  const showLoadTable = useSelector(LoadTableShow);
  const pointEditMode = useSelector(RecordPointEditMode);

  return showLoadTable ? (
    <RecordLoadTable />
  ) : (
    <MainZoneLayout
      leftCol={pointEditMode ? <RecordPointEdit /> : undefined}
      topLeft={<RecordInfoCard />}
      bottomLeft={<RecordGraphPreview />}
      leftColButtons={pointEditMode ? <RecordPointEditButtons /> : <RecordInfoCardButtons />}
      rightCol={<RecordPieceList />}
    />
  );
};

export default RecordTab;
