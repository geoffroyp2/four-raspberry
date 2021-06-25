import { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGraphLoadPage, selectGraphPageAmount, setGraphLoadPage } from "./_state/graphDisplaySlice";

import RecordPreview from "./records/RecordPreview";
import RecordLoadTable from "./records/RecordLoadTable";
import RecordLoadButtons from "./records/RecordLoadButtons";
import TargetPreview from "./targets/TargetPreview";
import TargetLoadTable from "./targets/TargetLoadTable";
import TargetLoadButtons from "./targets/TargetLoadButtons";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import TableTitle, { TableTitleTab } from "@components/tables/TableTitle";
import Pagination from "@components/tables/Pagination";

enum GraphType {
  Record,
  Target,
}

const GraphHome: FC = () => {
  const dispatch = useDispatch();

  const pageAmount = useSelector(selectGraphPageAmount);
  const loadPage = useSelector(selectGraphLoadPage);

  const [GraphTypeDisplay, setGraphTypeDisplay] = useState<GraphType>(GraphType.Record);

  const handleSubmitSearch = useCallback((fieldValue: string) => {
    console.log(fieldValue);
  }, []);

  const handleSetRecordPage = useCallback(
    (page: number) => {
      dispatch(setGraphLoadPage({ record: page }));
    },
    [dispatch]
  );
  const handleSetTargetPage = useCallback(
    (page: number) => {
      dispatch(setGraphLoadPage({ target: page }));
    },
    [dispatch]
  );

  return (
    <MainGrid cols="1" xlRows="home-xl-2" xlCols="home-xl-2">
      <MainGridItem col="1" row="2" xlCol="1" xlRow="1" className="max-w-3xl">
        <TableTitle
          tabs={[
            <TableTitleTab
              key="title-tab-target"
              title="Courbes de Référence"
              onClick={() => setGraphTypeDisplay(GraphType.Target)}
              selected={GraphTypeDisplay === GraphType.Target}
            />,
            <TableTitleTab
              key="title-tab-record"
              title="Courbes de Cuisson"
              onClick={() => setGraphTypeDisplay(GraphType.Record)}
              selected={GraphTypeDisplay === GraphType.Record}
            />,
          ]}
          handleSubmit={handleSubmitSearch}
        />
      </MainGridItem>
      {GraphTypeDisplay === GraphType.Target ? (
        <>
          <MainGridItem col="1" row="3" xlCol="1" xlRow="2" className="max-w-3xl">
            <TargetLoadTable />
            {pageAmount.target > 0 && (
              <Pagination currentPage={loadPage.target} pageAmount={pageAmount.target} handleSetPage={handleSetTargetPage} />
            )}
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
            {pageAmount.record > 0 && (
              <Pagination currentPage={loadPage.record} pageAmount={pageAmount.record} handleSetPage={handleSetRecordPage} />
            )}
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
