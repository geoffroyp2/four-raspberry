import { FC } from "react";
import { useSelector } from "react-redux";
import { selectGraphRoute } from "./_state/graphDisplaySlice";

import GraphTableTitle from "./elements/GraphsTableTitle";
import RecordPreview from "./records/RecordPreview";
import RecordLoadTable from "./records/RecordLoadTable";
import RecordLoadButtons from "./records/RecordLoadButtons";
import TargetPreview from "./targets/TargetPreview";
import TargetLoadTable from "./targets/TargetLoadTable";
import TargetLoadButtons from "./targets/TargetLoadButtons";
import MainGrid, { MainGridItem } from "@components/grids/MainGrid";

const GraphHome: FC = () => {
  const graphRoute = useSelector(selectGraphRoute);

  return (
    <MainGrid cols="1" xlRows="home-xl-2" xlCols="home-xl-2">
      <MainGridItem col="1" row="2" xlCol="1" xlRow="1" className="max-w-3xl">
        <GraphTableTitle />
      </MainGridItem>
      {graphRoute === "targets" ? (
        <>
          <MainGridItem col="1" row="3" xlCol="1" xlRow="2" className="max-w-3xl">
            <TargetLoadTable />
          </MainGridItem>
          <MainGridItem col="1" row="1" xlCol="2" xlRow="1" className="max-w-3xl">
            <TargetLoadButtons />
          </MainGridItem>
          <MainGridItem col="1" row="4" xlCol="2" xlRow="2" className="max-w-3xl">
            <TargetPreview />
          </MainGridItem>
        </>
      ) : (
        <>
          <MainGridItem col="1" row="3" xlCol="1" xlRow="2" className="max-w-3xl">
            <RecordLoadTable />
          </MainGridItem>
          <MainGridItem col="1" row="1" xlCol="2" xlRow="1" className="max-w-3xl">
            <RecordLoadButtons />
          </MainGridItem>
          <MainGridItem col="1" row="4" xlCol="2" xlRow="2" className="max-w-3xl">
            <RecordPreview />
          </MainGridItem>
        </>
      )}
    </MainGrid>
  );
};

export default GraphHome;
