import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { targetPageQuery, TargetPageQueryParams } from "../_gql/queries";
import { TargetQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { setTargetLoadList } from "../_state/targetDataSlice";
import {
  selectTargetLoadAmount,
  selectTargetLoadPage,
  selectTargetNameSearch,
  selectTargetSortDirection,
  selectTargetSortParam,
  setTargetLoadPage,
  setTargetTotalAmount,
} from "../_state/targetDisplaySlice";

const useTargetLoadPage = () => {
  const dispatch = useDispatch();

  const currentLoadAmount = useSelector(selectTargetLoadAmount);
  const currentLoadPage = useSelector(selectTargetLoadPage);
  const targetNameSearch = useSelector(selectTargetNameSearch);
  const targetSortParam = useSelector(selectTargetSortParam);
  const targetSortDirection = useSelector(selectTargetSortDirection);

  const [loadTargetPage, status] = useLazyQuery<TargetQueryRes>(targetPageQuery, {
    onCompleted: ({ targets }) => {
      if (currentLoadPage !== 0 && targets.rows.length === 0) {
        // if current page has no result
        dispatch(setTargetLoadPage(0));
      } else {
        dispatch(setTargetLoadList(targets.rows));
        dispatch(setTargetTotalAmount(targets.count));
      }
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const variables: TargetPageQueryParams = {
      variables: {
        page: currentLoadPage,
        amount: currentLoadAmount,
        sort: {
          sortBy: targetSortParam,
          order: targetSortDirection,
        },
      },
    };
    if (targetNameSearch !== null) variables.variables["name"] = targetNameSearch;
    loadTargetPage(variables);
  }, [currentLoadPage, currentLoadAmount, targetNameSearch, targetSortParam, targetSortDirection, loadTargetPage]);

  return status;
};

export default useTargetLoadPage;
