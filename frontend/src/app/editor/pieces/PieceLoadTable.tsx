import { FC, ReactNode, useCallback, useEffect, useState } from "react";

import { useLazyQuery } from "@apollo/client";
import { piecePageQuery } from "./_gql/queries";
import { PageQueryParams } from "@editor/_gql/types";
import { Piece, PieceQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectPieceLoadList, selectPieceNameSearch, setPieceLoadList } from "./_state/pieceDataSlice";
import {
  selectPieceLoadAmount,
  selectPieceLoadId,
  selectPieceLoadPage,
  selectPiecePageAmount,
  setPieceLoadId,
  setPieceLoadPage,
  setPieceTotalAmount,
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
    const variables: PageQueryParams = {
      variables: {
        page: currentLoadPage,
        amount: currentLoadAmount,
      },
    };
    if (pieceNameSearch !== null) variables.variables["name"] = pieceNameSearch;
    loadPiecePage(variables);
  }, [currentLoadPage, currentLoadAmount, pieceNameSearch, loadPiecePage]);

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
          rowContent={[piece.name ?? "-", piece.formula?.name ?? "-", dateToDisplayString(piece.createdAt, true)]}
          selected={piece.id === pieceId}
          id={piece.id ?? 0}
          disabled={piece.id === undefined}
          handleSelect={() => handleSelectRow(piece.id ?? 0)}
          hoverEffect
        />
      ))
    );
  }, [loading, currentLoadList, currentLoadAmount, pieceId, Rows.length, handleSelectRow]);

  if (error) return <NotFound />;

  return (
    <>
      <LoadTable>
        <TableHeader columnNames={["Nom", "Émail", "Créé le"]} />
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
