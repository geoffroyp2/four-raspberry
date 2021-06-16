import { FC } from "react";

import { useSelector } from "react-redux";
import { selectRecordData } from "../_state/recordDataSlice";

import RecordGraph from "./RecordGraph";
import InfosCard from "@components/cards/InfosCard";
import MainGrid, { MainGridItem } from "@components/grids/MainGrid";

const RecordInfos: FC = () => {
  const record = useSelector(selectRecordData);

  return (
    <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
      <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
        <RecordGraph />
      </MainGridItem>
      <MainGridItem col="1" row="2" xlCol="2" xlRow="1">
        <InfosCard>Infos</InfosCard>
      </MainGridItem>
    </MainGrid>
  );
};

export default RecordInfos;
