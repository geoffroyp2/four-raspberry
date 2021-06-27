import { FC } from "react";
import { useNavigate } from "react-router-dom";

import TargetGraph from "./TargetGraph";
import TargetInfos from "./TargetInfos";
import TargetGallery from "./TargetGallery";
import PiecePreview from "@editor/pieces/PiecePreview";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import BackButton from "@components/buttons/BackButton";

const TargetInfosPage: FC = () => {
  const navigate = useNavigate();

  return (
    <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
      <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
        <BackButton onClick={() => navigate("../../")} />
      </MainGridItem>
      <MainGridItem col="1" row="2" xlCol="1" xlRow="2">
        <TargetGraph />
      </MainGridItem>
      <MainGridItem col="1" row="3" xlCol="2" xlRow="2">
        <TargetInfos />
      </MainGridItem>
      <MainGridItem col="1" row="4" xlCol="1" xlRow="3">
        <TargetGallery />
      </MainGridItem>
      <MainGridItem col="1" row="5" xlCol="2" xlRow="3">
        <PiecePreview />
      </MainGridItem>
    </MainGrid>
  );
};

export default TargetInfosPage;
