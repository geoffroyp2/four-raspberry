import { useCallback } from "react";

import { useQuery } from "@apollo/client";
import { recordPageQuery } from "../_gql/queries";
import { PageQueryParams } from "@editor/_gql/types";
import { RecordQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordLoadList, setRecordLoadList } from "../_state/recordDataSlice";
import {
  selectGraphLoadAmount,
  selectGraphLoadId,
  selectGraphLoadPage,
  setGraphLoadId,
  setGraphLoadPage,
  setGraphTotalAmount,
} from "../_state/graphDisplaySlice";

import NotFound from "@editor/NotFound";
import LoadTable from "@tables/LoadTable";
import TableHeader from "@tables/TableHeader";
import TableRow from "@tables/TableRow";

import { dateToDisplayString } from "@app/_utils/dateFormat";

const RecordLoadTable = () => {
  const dispatch = useDispatch();

  const { recordId } = useSelector(selectGraphLoadId);
  const currentLoadPage = useSelector(selectGraphLoadPage);
  const currentLoadAmount = useSelector(selectGraphLoadAmount);
  const currentLoadList = useSelector(selectRecordLoadList);

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setGraphLoadId({ recordId: id }));
    },
    [dispatch]
  );

  const variables: PageQueryParams = {
    variables: {
      page: currentLoadPage,
      amount: currentLoadAmount,
    },
  };

  const { error } = useQuery<RecordQueryRes>(recordPageQuery, {
    ...variables,
    onCompleted: ({ records }) => {
      if (currentLoadPage !== 0 && records.rows.length === 0) {
        // if current page has no result
        dispatch(setGraphLoadPage(0));
      } else {
        dispatch(setRecordLoadList(records.rows));
        dispatch(setGraphTotalAmount(records.count));
      }
    },
  });

  if (error) return <NotFound />;

  return (
    <LoadTable>
      <TableHeader columnNames={["Nom", "Courbe de Référence", "Four", "Créé le"]} />
      <tbody>
        {currentLoadList.map((record) => (
          <TableRow
            key={`load-table-row-${record.id}`}
            rowContent={[
              record.name ?? "-",
              record.target?.name ?? "-",
              record.oven ?? "-",
              dateToDisplayString(record.createdAt, true),
            ]}
            selected={record.id === recordId}
            id={record.id ?? 0}
            handleSelect={() => handleSelectRow(record.id ?? 0)}
          />
        ))}
      </tbody>
    </LoadTable>
  );
};

export default RecordLoadTable;
