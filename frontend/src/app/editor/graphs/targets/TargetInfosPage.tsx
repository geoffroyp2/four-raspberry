import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import TargetGraph from "./TargetGraph";
import TargetInfos from "./TargetInfos";
import TargetGallery from "./TargetGallery";
import TargetPointEdit from "./TargetPointEdit";
import PiecePreview from "@editor/pieces/PiecePreview";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import BackButton from "@components/buttons/BackButton";
import BasicButton from "@components/buttons/BasicButton";

const TargetInfosPage: FC = () => {
  const navigate = useNavigate();
  const [InfosDisplay, setInfosDisplay] = useState<"infos" | "points">("infos");

  return (
    <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
      <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
        <BackButton onClick={() => navigate("../../")} />
      </MainGridItem>
      <MainGridItem col="1" row="2" xlCol="2" xlRow="1">
        <div className="flex x-full gap-2 justify-center">
          <BasicButton onClick={() => setInfosDisplay("infos")} color={InfosDisplay === "infos" ? "blue" : "gray"}>
            Infos
          </BasicButton>
          <BasicButton onClick={() => setInfosDisplay("points")} color={InfosDisplay === "points" ? "blue" : "gray"}>
            Points
          </BasicButton>
        </div>
      </MainGridItem>
      <MainGridItem col="1" row="3" xlCol="1" xlRow="2">
        <TargetGraph />
      </MainGridItem>
      <MainGridItem col="1" row="4" xlCol="2" xlRow="2">
        {InfosDisplay === "infos" && <TargetInfos />}
        {InfosDisplay === "points" && <TargetPointEdit />}
      </MainGridItem>
      <MainGridItem col="1" row="5" xlCol="1" xlRow="4">
        <TargetGallery />
      </MainGridItem>
      <MainGridItem col="1" row="6" xlCol="2" xlRow="4">
        <PiecePreview />
      </MainGridItem>
    </MainGrid>
  );
};

export default TargetInfosPage;
