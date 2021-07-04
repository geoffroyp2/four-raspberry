import { FC } from "react";
import { useNavigate } from "react-router-dom";

import PieceInfos from "./PieceInfos";
import PieceGallery from "./PieceGallery";
import PieceRecords from "./PieceRecords";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import BackButton from "@components/buttons/BackButton";

const PieceInfosPage: FC = () => {
  const navigate = useNavigate();

  return (
    <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
      <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
        <BackButton onClick={() => navigate("/pieces/back")} />
      </MainGridItem>
      <MainGridItem col="1" row="2" xlCol="1" xlRow="2">
        <PieceGallery />
      </MainGridItem>
      <MainGridItem col="1" row="3" xlCol="2" xlRow="2">
        <PieceInfos />
      </MainGridItem>
      <MainGridItem col="1" row="4" xlCol="1" xlRow="3">
        <PieceRecords />
      </MainGridItem>
    </MainGrid>
  );
};

export default PieceInfosPage;
