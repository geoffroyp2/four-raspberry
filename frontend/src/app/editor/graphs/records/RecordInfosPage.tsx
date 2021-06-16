import { FC } from "react";

import RecordGraph from "./RecordGraph";
import RecordInfos from "./RecordInfos";
import MainGrid, { MainGridItem } from "@components/grids/MainGrid";

const RecordInfosPage: FC = () => {
  return (
    <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
      <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
        <RecordGraph />
      </MainGridItem>
      <MainGridItem col="1" row="2" xlCol="2" xlRow="1">
        <RecordInfos />
      </MainGridItem>
    </MainGrid>
  );
};

export default RecordInfosPage;
