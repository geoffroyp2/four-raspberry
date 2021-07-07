import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import usePieceLoadPage from "./hooks/usePieceLoadPage";
import { Piece } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectPieceLoadList } from "./_state/pieceDataSlice";
import {
  selectPieceLoadAmount,
  selectPiecePreviewLoadId,
  selectPieceLoadPage,
  selectPiecePageAmount,
  setPiecePreviewLoadId,
  setPieceLoadPage,
  selectPieceSortParam,
  selectPieceSortDirection,
  setPieceSortDirection,
  setPieceSortParam,
} from "./_state/pieceDisplaySlice";

import NotFound from "@editor/NotFound";
import LoadTable from "@components/tables/LoadTable";
import TableHeader from "@components/tables/TableHeader";
import TableRow from "@components/tables/TableRow";
import Pagination from "@components/tables/Pagination";
import LoadTableFooter from "@components/tables/LoadTableFooter";

import { dateToDisplayString } from "@app/_utils/dateFormat";

type Props = {
  buttons?: ReactNode;
};

const PieceLoadTable: FC<Props> = ({ buttons }) => {
  const dispatch = useDispatch();
  const { loading, error } = usePieceLoadPage();
  const [Rows, setRows] = useState<ReactNode[]>([]);

  const pieceId = useSelector(selectPiecePreviewLoadId);
  const loadList = useSelector(selectPieceLoadList);
  const loadAmount = useSelector(selectPieceLoadAmount);
  const loadPage = useSelector(selectPieceLoadPage);
  const pageAmount = useSelector(selectPiecePageAmount);
  const sortParam = useSelector(selectPieceSortParam);
  const sortDirection = useSelector(selectPieceSortDirection);

  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setPieceLoadPage(page));
    },
    [dispatch]
  );

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setPiecePreviewLoadId(id));
    },
    [dispatch]
  );

  const handleSort = (param: typeof sortParam) => {
    if (param === sortParam) {
      dispatch(setPieceLoadPage(0));
      dispatch(setPieceSortDirection(sortDirection === "ASC" ? "DESC" : "ASC"));
    } else {
      dispatch(setPieceLoadPage(0));
      dispatch(setPieceSortDirection("ASC"));
      dispatch(setPieceSortParam(param));
    }
  };

  useEffect(() => {
    if (loading) {
      if (Rows.length === 0) {
        setRows(
          [...Array(loadAmount)].map((e, idx) => (
            <TableRow
              key={`load-table-row-${idx}`}
              rowContent={["", "", ""]}
              selected={false}
              id={0}
              disabled={true}
              handleSelect={() => {}}
            />
          ))
        );
      }
      return;
    }

    const pieces: Piece[] = [];
    for (let i = 0; i < loadList.length; ++i) pieces.push(loadList[i]);
    for (let i = loadList.length; i < loadAmount; ++i) pieces.push({});
    setRows(
      pieces.map((piece, idx) => (
        <TableRow
          key={`load-table-row-${idx}`}
          rowContent={[
            piece.name ?? "-",
            piece.formula?.name ?? "-",
            // dateToDisplayString(piece.createdAt, true),
            dateToDisplayString(piece.updatedAt, true),
          ]}
          selected={piece.id === pieceId}
          id={piece.id ?? 0}
          disabled={piece.id === undefined}
          handleSelect={() => handleSelectRow(piece.id ?? 0)}
          hoverEffect
        />
      ))
    );
  }, [loading, loadList, loadAmount, pieceId, Rows.length, handleSelectRow]);

  const getColumn = (name: string, param: typeof sortParam) => {
    return {
      name,
      onClick: () => handleSort(param),
      isSortParam: sortParam === param,
      sortDirection: sortDirection,
    };
  };

  if (error) return <NotFound />;

  return (
    <>
      <LoadTable>
        <TableHeader
          columns={[
            getColumn("Nom", "name"),
            getColumn("Émail", "formula"),
            // getColumn("Créé le", "createdAt"),
            getColumn("Dernière modification", "updatedAt"),
          ]}
        />
        <tbody>{Rows}</tbody>
      </LoadTable>
      <LoadTableFooter
        pagination={<Pagination currentPage={loadPage} pageAmount={pageAmount} handleSetPage={handleSetPage} small />}
        buttons={buttons}
      />
    </>
  );
};

export default PieceLoadTable;
