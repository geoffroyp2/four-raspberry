import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGraphLoadPage, selectGraphPageAmount, setGraphLoadPage } from "../_state/graphDisplaySlice";

import RecordPreview from "./RecordPreview";
import RecordLoadTable from "./RecordLoadTable";
import RecordLoadButtons from "./RecordLoadButtons";
import TableTitle from "@components/tables/TableTitle";
import Pagination from "@components/tables/Pagination";
import MainGrid, { MainGridItem } from "@components/grids/MainGrid";

const RecordHome = () => {
  const dispatch = useDispatch();

  const currentPageAmount = useSelector(selectGraphPageAmount);
  const currentLoadPage = useSelector(selectGraphLoadPage);

  const handleSubmitSearch = useCallback((fieldValue: string) => {
    console.log(fieldValue);
  }, []);

  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setGraphLoadPage(page));
    },
    [dispatch]
  );

  return (
    <MainGrid cols="1" xlRows="home-xl-2" xlCols="home-xl-2">
      <MainGridItem col="1" row="2" xlCol="1" xlRow="1" className="max-w-3xl">
        <TableTitle title="Courbes de Cuisson" handleSubmit={handleSubmitSearch} />
      </MainGridItem>
      <MainGridItem col="1" row="3" xlCol="1" xlRow="2" className="max-w-3xl">
        <RecordLoadTable />
        {currentPageAmount > 0 && (
          <Pagination currentPage={currentLoadPage} pageAmount={currentPageAmount} handleSetPage={handleSetPage} />
        )}
      </MainGridItem>
      <MainGridItem col="1" row="1" xlCol="2" xlRow="1" className="max-w-3xl">
        <RecordLoadButtons />
      </MainGridItem>
      <MainGridItem col="1" row="4" xlCol="2" xlRow="2" className="max-w-3xl">
        <RecordPreview />
      </MainGridItem>
    </MainGrid>
  );
};

export default RecordHome;
