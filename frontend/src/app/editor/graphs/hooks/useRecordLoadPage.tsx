import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { recordPageQuery, RecordPageQueryParams } from "../_gql/queries";
import { RecordQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setRecordLoadList } from "../_state/recordDataSlice";
import {
  selectRecordLoadAmount,
  selectRecordLoadPage,
  selectRecordNameSearch,
  selectRecordSortDirection,
  selectRecordSortParam,
  setRecordLoadPage,
  setRecordTotalAmount,
} from "../_state/recordDisplaySlice";

const useRecordLoadPage = () => {
  const dispatch = useDispatch();

  const currentLoadAmount = useSelector(selectRecordLoadAmount);
  const currentLoadPage = useSelector(selectRecordLoadPage);
  const recordNameSearch = useSelector(selectRecordNameSearch);
  const recordSortParam = useSelector(selectRecordSortParam);
  const recordSortDirection = useSelector(selectRecordSortDirection);

  const [loadRecordPage, status] = useLazyQuery<RecordQueryRes>(recordPageQuery, {
    onCompleted: ({ records }) => {
      if (currentLoadPage !== 0 && records.rows.length === 0) {
        // if current page has no result
        dispatch(setRecordLoadPage(0));
      } else {
        dispatch(setRecordLoadList(records.rows));
        dispatch(setRecordTotalAmount(records.count));
      }
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const variables: RecordPageQueryParams = {
      variables: {
        page: currentLoadPage,
        amount: currentLoadAmount,
        sort: {
          sortBy: recordSortParam,
          order: recordSortDirection,
        },
      },
    };
    if (recordNameSearch !== null) variables.variables["name"] = recordNameSearch;
    loadRecordPage(variables);
  }, [currentLoadPage, currentLoadAmount, recordNameSearch, recordSortParam, recordSortDirection, loadRecordPage]);

  return status;
};

export default useRecordLoadPage;
