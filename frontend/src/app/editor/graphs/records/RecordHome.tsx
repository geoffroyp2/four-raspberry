import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGraphLoadPage, selectGraphPageAmount, setGraphLoadPage } from "../_state/graphDisplaySlice";

import RecordPreview from "./RecordPreview";
import TableTitle from "@tables/TableTitle";
import RecordLoadTable from "./RecordLoadTable";
import Pagination from "@tables/Pagination";
import RecordLoadButtons from "./RecordLoadButtons";

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
    <div className="grid xl:grid-cols-home-xl xl:grid-rows-home-xl grid-cols-1 pt-8">
      <div className="container pt-6 mx-auto px-4 sm:px-8 max-w-3xl col-start-1 row-start-1">
        <TableTitle title="Courbes de Cuisson" handleSubmit={handleSubmitSearch} />
      </div>
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl col-start-1 row-start-2">
        <RecordLoadTable />
        {currentPageAmount > 0 && (
          <Pagination currentPage={currentLoadPage} pageAmount={currentPageAmount} handleSetPage={handleSetPage} />
        )}
      </div>
      <div className="container pt-6 mx-auto px-4 sm:px-8 max-w-3xl col-start-2 row-start-1">
        <RecordLoadButtons />
      </div>
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl col-start-1 row-start-3 xl:col-start-2 xl:row-start-2">
        <RecordPreview />
      </div>
    </div>
  );
};

export default RecordHome;
