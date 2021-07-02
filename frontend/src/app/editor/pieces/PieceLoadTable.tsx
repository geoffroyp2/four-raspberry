import { FC, useCallback, useEffect, useMemo } from "react";

import { useLazyQuery } from "@apollo/client";
import { piecePageQuery } from "./_gql/queries";
import { PageQueryParams } from "@editor/_gql/types";
import { Piece, PieceQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectPieceLoadList, setPieceLoadList } from "./_state/pieceDataSlice";
import {
  selectPieceLoadAmount,
  selectPieceLoadId,
  selectPieceLoadPage,
  setPieceLoadId,
  setPieceLoadPage,
  setPieceTotalAmount,
} from "./_state/pieceDisplaySlice";

import NotFound from "@editor/NotFound";
import LoadTable from "@components/tables/LoadTable";
import TableHeader from "@components/tables/TableHeader";
import TableRow from "@components/tables/TableRow";

import { dateToDisplayString } from "@app/_utils/dateFormat";

const PieceLoadTable: FC = () => {
  const dispatch = useDispatch();

  const pieceId = useSelector(selectPieceLoadId);
  const currentLoadPage = useSelector(selectPieceLoadPage);
  const currentLoadAmount = useSelector(selectPieceLoadAmount);
  const currentLoadList = useSelector(selectPieceLoadList);

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setPieceLoadId(id));
    },
    [dispatch]
  );

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
    loadPiecePage(variables);
  }, [currentLoadPage, currentLoadAmount, loadPiecePage]);

  const rows = useMemo(() => {
    const pieces: Piece[] = [];
    if (loading) {
      for (let i = currentLoadList.length; i < currentLoadAmount; ++i) {
        pieces.push({});
      }
    } else {
      for (let i = 0; i < currentLoadList.length; ++i) {
        pieces.push(currentLoadList[i]);
      }
      for (let i = currentLoadList.length; i < currentLoadAmount; ++i) {
        pieces.push({});
      }
    }

    return pieces.map((piece, idx) => (
      <TableRow
        key={`load-table-row-${idx}`}
        rowContent={[piece.name ?? "-", piece.formula?.name ?? "-", dateToDisplayString(piece.createdAt, true)]}
        selected={piece.id === pieceId}
        id={piece.id ?? 0}
        disabled={piece.id === undefined}
        handleSelect={() => handleSelectRow(piece.id ?? 0)}
      />
    ));
  }, [currentLoadList, currentLoadAmount, handleSelectRow, pieceId, loading]);

  if (error) return <NotFound />;

  return (
    <LoadTable>
      <TableHeader columnNames={["Nom", "Émail", "Créé le"]} />
      <tbody>{rows}</tbody>
    </LoadTable>
  );
};

export default PieceLoadTable;
