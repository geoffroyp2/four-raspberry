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
  selectGraphPageAmount,
  setGraphLoadId,
  setGraphLoadPage,
  setGraphTotalAmount,
} from "../_state/graphDisplaySlice";

import NotFound from "@editor/NotFound";
import LoadTable from "@tables/LoadTable";
import TableTitle from "@tables/TableTitle";
import TableHeader from "@tables/TableHeader";
import TableRow from "@tables/TableRow";
import Pagination from "@tables/Pagination";

import { dateToDisplayString } from "@app/_utils/dateFormat";

const RecordLoadTable = () => {
  const dispatch = useDispatch();

  const { recordId } = useSelector(selectGraphLoadId);
  const currentLoadPage = useSelector(selectGraphLoadPage);
  const currentLoadAmount = useSelector(selectGraphLoadAmount);
  const currentPageAmount = useSelector(selectGraphPageAmount);
  const currentLoadList = useSelector(selectRecordLoadList);

  const handleSubmit = useCallback((fieldValue: string) => {
    console.log(fieldValue);
  }, []);

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setGraphLoadId({ recordId: id }));
    },
    [dispatch]
  );

  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setGraphLoadPage(page));
    },
    [dispatch]
  );

  const variables: PageQueryParams = {
    variables: {
      page: currentLoadPage,
      amount: currentLoadAmount,
    },
  };

  const { loading, error } = useQuery<RecordQueryRes>(recordPageQuery, {
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
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        {!loading && (
          <>
            <TableTitle title="Courbes de Cuisson" handleSubmit={handleSubmit} />
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
            <Pagination currentPage={currentLoadPage} pageAmount={currentPageAmount} handleSetPage={handleSetPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default RecordLoadTable;
