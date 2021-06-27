import { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTargetLoadPage, selectTargetPageAmount, setTargetLoadPage } from "./_state/targetDisplaySlice";

import RecordPreview from "./records/RecordPreview";
import RecordLoadTable from "./records/RecordLoadTable";
import RecordLoadButtons from "./records/RecordLoadButtons";
import TargetPreview from "./targets/TargetPreview";
import TargetLoadTable from "./targets/TargetLoadTable";
import TargetLoadButtons from "./targets/TargetLoadButtons";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import TableTitle, { TableTitleTab } from "@components/tables/TableTitle";
import Pagination from "@components/tables/Pagination";
import { setRecordLoadPage } from "./_state/recordDisplaySlice";

enum GraphType {
  Record,
  Target,
}

const GraphHome: FC = () => {
  const dispatch = useDispatch();

  const targetLoadPage = useSelector(selectTargetLoadPage);
  const recordLoadPage = useSelector(selectTargetLoadPage);
  const targetPageAmount = useSelector(selectTargetPageAmount);
  const recordPageAmount = useSelector(selectTargetPageAmount);

  const [GraphTypeDisplay, setGraphTypeDisplay] = useState<GraphType>(GraphType.Record);

  const handleSubmitSearch = useCallback((fieldValue: string) => {
    console.log(fieldValue);
  }, []);

  const handleSetRecordPage = useCallback(
    (page: number) => {
      dispatch(setRecordLoadPage(page));
    },
    [dispatch]
  );
  const handleSetTargetPage = useCallback(
    (page: number) => {
      dispatch(setTargetLoadPage(page));
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
            {targetPageAmount > 0 && (
              <Pagination currentPage={targetLoadPage} pageAmount={targetPageAmount} handleSetPage={handleSetTargetPage} />
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
            {recordPageAmount > 0 && (
              <Pagination currentPage={recordLoadPage} pageAmount={recordPageAmount} handleSetPage={handleSetRecordPage} />
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
