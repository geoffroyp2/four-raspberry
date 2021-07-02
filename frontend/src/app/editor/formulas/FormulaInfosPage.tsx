import { FC } from "react";
import { useNavigate } from "react-router-dom";

import FormulaInfos from "./FormulaInfos";
// import FormulaGallery from "./FormulaGallery";
// import FormulaRecords from "./FormulaRecords";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import BackButton from "@components/buttons/BackButton";

const FormulaInfosPage: FC = () => {
  const navigate = useNavigate();

  return (
    <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
      <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
        <BackButton onClick={() => navigate("../back")} />
      </MainGridItem>
      <MainGridItem col="1" row="2" xlCol="1" xlRow="2">
        {/* <FormulaGallery /> */}
      </MainGridItem>
      <MainGridItem col="1" row="3" xlCol="2" xlRow="2">
        <FormulaInfos />
      </MainGridItem>
      <MainGridItem col="1" row="4" xlCol="1" xlRow="3">
        {/* <FormulaRecords /> */}
      </MainGridItem>
    </MainGrid>
  );
};

export default FormulaInfosPage;
