import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPieceLoadPage, selectPiecePageAmount, setPieceLoadPage } from "./_state/pieceDisplaySlice";

import PiecePreview from "./PiecePreview";
import PieceLoadTable from "./PieceLoadTable";
import PieceLoadButtons from "./PieceLoadButtons";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import TableTitle from "@components/tables/TableTitle";
import Pagination from "@components/tables/Pagination";

const GraphHome: FC = () => {
  const dispatch = useDispatch();

  const pieceLoadPage = useSelector(selectPieceLoadPage);
  const piecePageAmount = useSelector(selectPiecePageAmount);

  const handleSubmitSearch = useCallback((fieldValue: string) => {
    console.log(fieldValue);
  }, []);

  const handleSetPiecePage = useCallback(
    (page: number) => {
      dispatch(setPieceLoadPage(page));
    },
    [dispatch]
  );

  return (
    <MainGrid cols="1" xlRows="home-xl-2" xlCols="home-xl-2">
      <MainGridItem col="1" row="2" xlCol="1" xlRow="1" className="max-w-3xl">
        <TableTitle handleSubmit={handleSubmitSearch} placeholder="Nom de la potterie" />
      </MainGridItem>

      <MainGridItem col="1" row="3" xlCol="1" xlRow="2" className="max-w-3xl">
        <PieceLoadTable />
        {piecePageAmount > 0 && (
          <Pagination currentPage={pieceLoadPage} pageAmount={piecePageAmount} handleSetPage={handleSetPiecePage} />
        )}
      </MainGridItem>
      <MainGridItem col="1" row="1" xlCol="2" xlRow="1" className="max-w-3xl">
        <PieceLoadButtons />
      </MainGridItem>
      <MainGridItem col="1" row="4" xlCol="2" xlRow="2" className="max-w-3xl">
        <PiecePreview />
      </MainGridItem>
    </MainGrid>
  );
};

export default GraphHome;
