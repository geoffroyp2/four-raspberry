import { FC, useCallback, useEffect, useMemo } from "react";

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
  setRecordLoadId,
  setRecordLoadPage,
  setRecordTotalAmount,
} from "../_state/recordDisplaySlice";

import NotFound from "@editor/NotFound";
import LoadTable from "@components/tables/LoadTable";
import TableHeader from "@components/tables/TableHeader";
import TableRow from "@components/tables/TableRow";

import { dateToDisplayString } from "@app/_utils/dateFormat";

const RecordLoadTable: FC = () => {
  const dispatch = useDispatch();

  const recordId = useSelector(selectRecordLoadId);
  const currentLoadPage = useSelector(selectRecordLoadPage);
  const currentLoadAmount = useSelector(selectRecordLoadAmount);
  const currentLoadList = useSelector(selectRecordLoadList);

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setRecordLoadId(id));
    },
    [dispatch]
  );

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

  const rows = useMemo(() => {
    const records: Record[] = [];
    if (loading) {
      for (let i = currentLoadList.length; i < currentLoadAmount; ++i) {
        records.push({});
      }
    } else {
      for (let i = 0; i < currentLoadList.length; ++i) {
        records.push(currentLoadList[i]);
      }
      for (let i = currentLoadList.length; i < currentLoadAmount; ++i) {
        records.push({});
      }
    }

    return records.map((record, idx) => (
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
    ));
  }, [currentLoadList, currentLoadAmount, handleSelectRow, recordId, loading]);

  if (error) return <NotFound />;

  return (
    <LoadTable>
      <TableHeader columnNames={["Nom", "Courbe de Référence", "Four", "Créé le"]} />
      <tbody>{rows}</tbody>
    </LoadTable>
  );
};

export default RecordLoadTable;
