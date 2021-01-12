import React from "react";

import { useSelector } from "react-redux";
import { LoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";

import MainZoneLayout from "@UIGeneric/MainZoneLayout";

import PieceLoadTable from "./PieceLoadTable";
import PieceInfoCard from "./Zones/InfoCard";
import PieceInfoCardButtons from "./Zones/InfoCardButtons";
import PiecePhotos from "./Zones/PiecePhotos";
import PieceFormula from "./Zones/PieceFormula";

const PieceTab = () => {
  const showLoadTable = useSelector(LoadTableShow);

  return showLoadTable ? (
    <PieceLoadTable />
  ) : (
    <MainZoneLayout
      topLeft={<PieceInfoCard />}
      bottomLeft={<PieceFormula />}
      leftColButtons={<PieceInfoCardButtons />}
      rightCol={<PiecePhotos />}
    />
  );
};

export default PieceTab;
