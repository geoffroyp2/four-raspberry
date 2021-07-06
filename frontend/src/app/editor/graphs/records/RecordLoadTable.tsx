import { FC, ReactNode, useCallback, useEffect, useState } from "react";

import { useLazyQuery } from "@apollo/client";
import { recordPageQuery } from "../_gql/queries";
import { PageQueryParams } from "@editor/_gql/types";
import { Record, RecordQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordLoadList, setRecordLoadList } from "../_state/recordDataSlice";
import {
  selectRecordLoadAmount,
  selectRecordLoadId,
  selectRecordLoadPage,
  selectRecordPageAmount,
  setRecordLoadId,
  setRecordLoadPage,
  setRecordTotalAmount,
} from "../_state/recordDisplaySlice";

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

const RecordLoadTable: FC<Props> = ({ buttons }) => {
  const dispatch = useDispatch();

  const [Rows, setRows] = useState<ReactNode[]>([]);
  const recordId = useSelector(selectRecordLoadId);
  const currentLoadPage = useSelector(selectRecordLoadPage);
  const currentLoadAmount = useSelector(selectRecordLoadAmount);
  const currentLoadList = useSelector(selectRecordLoadList);
  const recordLoadPage = useSelector(selectRecordLoadPage);
  const recordPageAmount = useSelector(selectRecordPageAmount);

  const [loadRecordPage, { loading, error }] = useLazyQuery<RecordQueryRes>(recordPageQuery, {
    onCompleted: ({ records }) => {
      if (currentLoadPage !== 0 && records.rows.length === 0) {
        // if current page has no result
        dispatch(setRecordLoadPage(0));
      } else {
        dispatch(setRecordLoadList(records.rows));
        dispatch(setRecordTotalAmount(records.count));
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
    loadRecordPage(variables);
  }, [currentLoadPage, currentLoadAmount, loadRecordPage]);

  const handleSetRecordPage = useCallback(
    (page: number) => {
      dispatch(setRecordLoadPage(page));
    },
    [dispatch]
  );

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setRecordLoadId(id));
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

    const records: Record[] = [];
    for (let i = 0; i < currentLoadList.length; ++i) records.push(currentLoadList[i]);
    for (let i = currentLoadList.length; i < currentLoadAmount; ++i) records.push({});
    setRows(
      records.map((record, idx) => (
        <TableRow
          key={`load-table-row-${idx}`}
          rowContent={[
            record.name ?? "-",
            record.target?.name ?? "-",
            record.oven ?? "-",
            dateToDisplayString(record.createdAt, true),
          ]}
          selected={record.id === recordId}
          id={record.id ?? 0}
          disabled={record.id === undefined}
          handleSelect={() => handleSelectRow(record.id ?? 0)}
          hoverEffect
        />
      ))
    );
  }, [loading, currentLoadList, currentLoadAmount, recordId, Rows.length, handleSelectRow]);

  if (error) return <NotFound />;

  return (
    <>
      <LoadTable>
        <TableHeader columnNames={["Nom", "Courbe de Référence", "Four", "Créé le"]} />
        <tbody>{Rows}</tbody>
      </LoadTable>

      <LoadTableFooter
        pagination={
          <Pagination currentPage={recordLoadPage} pageAmount={recordPageAmount} handleSetPage={handleSetRecordPage} small />
        }
        buttons={buttons}
      />
    </>
  );
};

export default RecordLoadTable;
