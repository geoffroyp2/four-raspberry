import { FC } from "react";

import FormulaPreview from "./FormulaPreview";
import FormulaLoadTable from "./FormulaLoadTable";
import FormulaLoadButtons from "./FormulaLoadButtons";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import FormulaTableTitle from "./elements/FormulaTableTitle";

const GraphHome: FC = () => {
  return (
    <MainGrid cols="1" xlRows="home-xl-2" xlCols="home-xl-2">
      <MainGridItem col="1" row="2" xlCol="1" xlRow="1" className="max-w-3xl">
        <FormulaTableTitle />
      </MainGridItem>
      <MainGridItem col="1" row="3" xlCol="1" xlRow="2" className="max-w-3xl">
        <FormulaLoadTable />
      </MainGridItem>
      <MainGridItem col="1" row="1" xlCol="2" xlRow="1" className="max-w-3xl">
        <FormulaLoadButtons />
      </MainGridItem>
      <MainGridItem col="1" row="4" xlCol="2" xlRow="2" className="max-w-3xl">
        <FormulaPreview />
      </MainGridItem>
    </MainGrid>
  );
};

export default GraphHome;
