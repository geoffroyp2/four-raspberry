import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGraphRoute, setGraphRoute } from "./_state/graphDisplaySlice";

import RecordPreview from "./records/RecordPreview";
import RecordLoadTable from "./records/RecordLoadTable";
import RecordLoadButtons from "./records/RecordLoadButtons";
import TargetPreview from "./targets/TargetPreview";
import TargetLoadTable from "./targets/TargetLoadTable";
import TargetLoadButtons from "./targets/TargetLoadButtons";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import TableTitle, { TableTitleTab } from "@components/tables/TableTitle";

const GraphHome: FC = () => {
  const dispatch = useDispatch();

  const graphRoute = useSelector(selectGraphRoute);

  const handleSubmitSearch = useCallback((fieldValue: string) => {
    console.log(fieldValue);
  }, []);

  return (
    <MainGrid cols="1" xlRows="home-xl-2" xlCols="home-xl-2">
      <MainGridItem col="1" row="2" xlCol="1" xlRow="1" className="max-w-3xl">
        <TableTitle
          tabs={[
            <TableTitleTab
              key="title-tab-target"
              title="Courbes de Référence"
              onClick={() => dispatch(setGraphRoute("targets"))}
              selected={graphRoute === "targets"}
            />,
            <TableTitleTab
              key="title-tab-record"
              title="Courbes de Cuisson"
              onClick={() => dispatch(setGraphRoute("records"))}
              selected={graphRoute === "records"}
            />,
          ]}
          handleSubmit={handleSubmitSearch}
          placeholder="nom de la courbe"
        />
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
