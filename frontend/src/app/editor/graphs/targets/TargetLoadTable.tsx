import { FC, ReactNode, useCallback, useEffect, useState } from "react";

import { useLazyQuery } from "@apollo/client";
import { targetPageQuery } from "../_gql/queries";
import { PageQueryParams } from "@editor/_gql/types";
import { Target, TargetQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetLoadList, setTargetLoadList } from "../_state/targetDataSlice";
import {
  selectTargetLoadAmount,
  selectTargetLoadId,
  selectTargetLoadPage,
  selectTargetPageAmount,
  setTargetLoadId,
  setTargetLoadPage,
  setTargetTotalAmount,
  selectTargetNameSearch,
  selectTargetSortParam,
  selectTargetSortDirection,
  setTargetSortDirection,
  setTargetSortParam,
} from "../_state/targetDisplaySlice";

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

const TargetLoadTable: FC<Props> = ({ buttons }) => {
  const dispatch = useDispatch();

  const [Rows, setRows] = useState<ReactNode[]>([]);
  const targetId = useSelector(selectTargetLoadId);
  const currentLoadPage = useSelector(selectTargetLoadPage);
  const currentLoadAmount = useSelector(selectTargetLoadAmount);
  const currentLoadList = useSelector(selectTargetLoadList);
  const targetLoadPage = useSelector(selectTargetLoadPage);
  const targetPageAmount = useSelector(selectTargetPageAmount);
  const targetNameSearch = useSelector(selectTargetNameSearch);
  const targetSortParam = useSelector(selectTargetSortParam);
  const targetSortDirection = useSelector(selectTargetSortDirection);

  const [loadTargetPage, { loading, error }] = useLazyQuery<TargetQueryRes>(targetPageQuery, {
    onCompleted: ({ targets }) => {
      if (currentLoadPage !== 0 && targets.rows.length === 0) {
        // if current page has no result
        dispatch(setTargetLoadPage(0));
      } else {
        dispatch(setTargetLoadList(targets.rows));
        dispatch(setTargetTotalAmount(targets.count));
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

    if (targetNameSearch !== null) variables.variables["name"] = targetNameSearch;
    loadTargetPage(variables);
  }, [currentLoadPage, currentLoadAmount, targetNameSearch, loadTargetPage]);

  const handleSetTargetPage = useCallback(
    (page: number) => {
      dispatch(setTargetLoadPage(page));
    },
    [dispatch]
  );

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setTargetLoadId(id));
    },
    [dispatch]
  );

  const handleSort = (param: typeof targetSortParam) => {
    if (param === targetSortParam) {
      dispatch(setTargetSortDirection(targetSortDirection === "ASC" ? "DESC" : "ASC"));
    } else {
      dispatch(setTargetSortParam(param));
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

    const targets: Target[] = [];
    for (let i = 0; i < currentLoadList.length; ++i) targets.push(currentLoadList[i]);
    for (let i = currentLoadList.length; i < currentLoadAmount; ++i) targets.push({});
    setRows(
      targets.map((target, idx) => (
        <TableRow
          key={`load-table-row-${idx}`}
          rowContent={[target.name ?? "-", target.oven ?? "-", dateToDisplayString(target.createdAt, true)]}
          selected={target.id === targetId}
          id={target.id ?? 0}
          disabled={target.id === undefined}
          handleSelect={() => handleSelectRow(target.id ?? 0)}
          hoverEffect
        />
      ))
    );
  }, [loading, currentLoadList, currentLoadAmount, targetId, Rows.length, handleSelectRow]);

  const getColumn = (name: string, param: typeof targetSortParam) => {
    return {
      name,
      onClick: () => handleSort(param),
      isSortParam: targetSortParam === param,
      sortDirection: targetSortDirection,
    };
  };

  if (error) return <NotFound />;

  return (
    <>
      <LoadTable>
        <TableHeader
          columns={[
            getColumn("Nom", "name"),
            getColumn("Four", "oven"),
            getColumn("Créé le", "createdAt"),
            getColumn("Dernière modification", "updatedAt"),
          ]}
        />
        <tbody>{Rows}</tbody>
      </LoadTable>
      <LoadTableFooter
        pagination={
          <Pagination currentPage={targetLoadPage} pageAmount={targetPageAmount} handleSetPage={handleSetTargetPage} small />
        }
        buttons={buttons}
      />
    </>
  );
};

export default TargetLoadTable;
