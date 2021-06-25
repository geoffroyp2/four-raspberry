import { FC } from "react";

// import TargetGraph from "./TargetGraph";
import TargetInfos from "./TargetInfos";
// import TargetGallery from "./TargetGallery";
import MainGrid, { MainGridItem } from "@components/grids/MainGrid";

const TargetInfosPage: FC = () => {
  return (
    <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
      <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
        {/* <TargetGraph /> */}
      </MainGridItem>
      <MainGridItem col="1" row="2" xlCol="2" xlRow="1">
        <TargetInfos />
      </MainGridItem>
      <MainGridItem col="1" row="3" xlCol="1" xlRow="2">
        {/* <TargetGallery /> */}
      </MainGridItem>
    </MainGrid>
  );
};

export default TargetInfosPage;
