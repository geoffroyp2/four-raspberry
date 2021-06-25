import { FC } from "react";
import { useNavigate } from "react-router-dom";

import RecordGraph from "./RecordGraph";
import RecordInfos from "./RecordInfos";
import RecordGallery from "./RecordGallery";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import BackButton from "@components/buttons/BackButton";

const RecordInfosPage: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
        <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
          <BackButton onClick={() => navigate("../../")} />
        </MainGridItem>
        <MainGridItem col="1" row="2" xlCol="1" xlRow="2">
          <RecordGraph />
        </MainGridItem>
        <MainGridItem col="1" row="3" xlCol="2" xlRow="2">
          <RecordInfos />
        </MainGridItem>
        <MainGridItem col="1" row="4" xlCol="1" xlRow="3">
          <RecordGallery />
        </MainGridItem>
      </MainGrid>
    </>
  );
};

export default RecordInfosPage;
