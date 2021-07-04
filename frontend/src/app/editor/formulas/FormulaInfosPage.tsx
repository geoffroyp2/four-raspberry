import { FC } from "react";
import { useNavigate } from "react-router-dom";

import FormulaInfos from "./FormulaInfos";
import FormulaGallery from "./FormulaGallery";
import PiecePreview from "@editor/pieces/PiecePreview";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import BackButton from "@components/buttons/BackButton";

const FormulaInfosPage: FC = () => {
  const navigate = useNavigate();

  return (
    <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
      <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
        <BackButton onClick={() => navigate("/formulas/back")} />
      </MainGridItem>
      <MainGridItem col="1" row="2" xlCol="1" xlRow="2">
        <div className="flex items-center justify-center h-full bg-gray-700">
          <div className="text-xl">(Composition)</div>
        </div>
      </MainGridItem>
      <MainGridItem col="1" row="3" xlCol="2" xlRow="2">
        <FormulaInfos />
      </MainGridItem>
      <MainGridItem col="1" row="4" xlCol="1" xlRow="3">
        <FormulaGallery />
      </MainGridItem>
      <MainGridItem col="1" row="5" xlCol="2" xlRow="3">
        <PiecePreview showGoto />
      </MainGridItem>
    </MainGrid>
  );
};

export default FormulaInfosPage;
