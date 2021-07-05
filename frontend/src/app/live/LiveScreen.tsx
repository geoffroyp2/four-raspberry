import { FC } from "react";

import LiveGraph from "./LiveGraph";
import LiveInfos from "./LiveInfos";
import LiveButtons from "./LiveButtons";
import LiveSubscriptionHandler from "./LiveSuscriptionHandler";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";

const LiveScreen: FC = () => {
  return (
    <>
      <LiveSubscriptionHandler />
      <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
        <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
          <LiveGraph />
        </MainGridItem>
        <MainGridItem col="1" row="2" xlCol="2" xlRow="1">
          <LiveInfos />
        </MainGridItem>
        <MainGridItem col="1" row="3" xlCol="2" xlRow="2">
          <LiveButtons />
        </MainGridItem>
      </MainGrid>
    </>
  );
};

export default LiveScreen;
