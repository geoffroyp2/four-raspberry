import { FC, ReactNode, useCallback, useEffect, useState } from "react";

import { useLazyQuery } from "@apollo/client";
import { piecePageQuery, PiecePageQueryParams } from "./_gql/queries";
import { Piece, PieceQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectPieceLoadList, setPieceLoadList } from "./_state/pieceDataSlice";
import {
  selectPieceLoadAmount,
  selectPieceLoadId,
  selectPieceLoadPage,
  selectPiecePageAmount,
  setPieceLoadId,
  setPieceLoadPage,
  setPieceTotalAmount,
  selectPieceNameSearch,
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

  const [Rows, setRows] = useState<ReactNode[]>([]);
  const pieceId = useSelector(selectPieceLoadId);
  const currentLoadPage = useSelector(selectPieceLoadPage);
  const currentLoadAmount = useSelector(selectPieceLoadAmount);
  const currentLoadList = useSelector(selectPieceLoadList);
  const pieceLoadPage = useSelector(selectPieceLoadPage);
  const piecePageAmount = useSelector(selectPiecePageAmount);
  const pieceNameSearch = useSelector(selectPieceNameSearch);
  const pieceSortParam = useSelector(selectPieceSortParam);
  const pieceSortDirection = useSelector(selectPieceSortDirection);

  const [loadPiecePage, { loading, error }] = useLazyQuery<PieceQueryRes>(piecePageQuery, {
    onCompleted: ({ pieces }) => {
      if (currentLoadPage !== 0 && pieces.rows.length === 0) {
        // if current page has no result
        dispatch(setPieceLoadPage(0));
      } else {
        dispatch(setPieceLoadList(pieces.rows));
        dispatch(setPieceTotalAmount(pieces.count));
      }
    },
  });

  useEffect(() => {
    const variables: PiecePageQueryParams = {
      variables: {
        page: currentLoadPage,
        amount: currentLoadAmount,
        sort: {
          sortBy: pieceSortParam,
          order: pieceSortDirection,
        },
      },
    };
    if (pieceNameSearch !== null) variables.variables["name"] = pieceNameSearch;
    loadPiecePage(variables);
  }, [currentLoadPage, currentLoadAmount, pieceNameSearch, pieceSortParam, pieceSortDirection, loadPiecePage]);

  const handleSetPiecePage = useCallback(
    (page: number) => {
      dispatch(setPieceLoadPage(page));
    },
    [dispatch]
  );

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setPieceLoadId(id));
    },
    [dispatch]
  );

  const handleSort = (param: typeof pieceSortParam) => {
    if (param === pieceSortParam) {
      dispatch(setPieceLoadPage(0));
      dispatch(setPieceSortDirection(pieceSortDirection === "ASC" ? "DESC" : "ASC"));
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
          [...Array(currentLoadAmount)].map((e, idx) => (
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
    for (let i = 0; i < currentLoadList.length; ++i) pieces.push(currentLoadList[i]);
    for (let i = currentLoadList.length; i < currentLoadAmount; ++i) pieces.push({});
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
  }, [loading, currentLoadList, currentLoadAmount, pieceId, Rows.length, handleSelectRow]);

  const getColumn = (name: string, param: typeof pieceSortParam) => {
    return {
      name,
      onClick: () => handleSort(param),
      isSortParam: pieceSortParam === param,
      sortDirection: pieceSortDirection,
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
        pagination={
          <Pagination currentPage={pieceLoadPage} pageAmount={piecePageAmount} handleSetPage={handleSetPiecePage} small />
        }
        buttons={buttons}
      />
    </>
  );
};

export default PieceLoadTable;
