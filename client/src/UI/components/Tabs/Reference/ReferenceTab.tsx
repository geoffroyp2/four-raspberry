import React from "react";

import { useSelector } from "react-redux";
import { LoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";

import MainZoneLayout from "@UIGeneric/MainZoneLayout";
import { ReferencePointEditMode } from "@redux/displayStateReducers/referenceDisplaySlice";

import ReferenceLoadTable from "./ReferenceLoadTable";
import ReferencePointEdit from "./Zones/PointEdit";
import ReferencePointEditButtons from "./Zones/PointEditButtons";
import ReferenceInfoCard from "./Zones/InfoCard";
import ReferenceInfoCardButtons from "./Zones/InfoCardButtons";
import ReferenceGraphPreview from "./Zones/GraphPreview";
import ReferencePieceList from "./Zones/PieceList";

const ReferenceTab = () => {
  const showLoadTable = useSelector(LoadTableShow);
  const pointEditMode = useSelector(ReferencePointEditMode);

  return showLoadTable ? (
    <ReferenceLoadTable />
  ) : (
    <MainZoneLayout
      left={
        pointEditMode
          ? [<ReferencePointEdit />, <ReferencePointEditButtons />]
          : [<ReferenceInfoCard />, <ReferenceInfoCardButtons />]
      }
      right={[<ReferenceGraphPreview />, <ReferencePieceList />]}
    />
  );
};

export default ReferenceTab;
