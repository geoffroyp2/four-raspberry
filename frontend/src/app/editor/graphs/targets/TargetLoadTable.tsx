import { FC, useCallback, useMemo } from "react";

import { useQuery } from "@apollo/client";
import { targetPageQuery } from "../_gql/queries";
import { PageQueryParams } from "@editor/_gql/types";
import { Target, TargetQueryRes } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetLoadList, setTargetLoadList } from "../_state/targetDataSlice";
import {
  selectGraphLoadAmount,
  selectGraphLoadId,
  selectGraphLoadPage,
  setGraphLoadId,
  setGraphLoadPage,
  setGraphTotalAmount,
} from "../_state/graphDisplaySlice";

import NotFound from "@editor/NotFound";
import LoadTable from "@components/tables/LoadTable";
import TableHeader from "@components/tables/TableHeader";
import TableRow from "@components/tables/TableRow";

import { dateToDisplayString } from "@app/_utils/dateFormat";

const TargetLoadTable: FC = () => {
  const dispatch = useDispatch();

  const { targetId } = useSelector(selectGraphLoadId);
  const currentLoadPage = useSelector(selectGraphLoadPage);
  const currentLoadAmount = useSelector(selectGraphLoadAmount);
  const currentLoadList = useSelector(selectTargetLoadList);

  const handleSelectRow = useCallback(
    (id: number) => {
      dispatch(setGraphLoadId({ targetId: id }));
    },
    [dispatch]
  );

  const variables: PageQueryParams = {
    variables: {
      page: currentLoadPage.target,
      amount: currentLoadAmount,
    },
  };

  const { loading, error } = useQuery<TargetQueryRes>(targetPageQuery, {
    ...variables,
    onCompleted: ({ targets }) => {
      if (currentLoadPage.target !== 0 && targets.rows.length === 0) {
        // if current page has no result
        dispatch(setGraphLoadPage({ target: 0 }));
      } else {
        dispatch(setTargetLoadList(targets.rows));
        dispatch(setGraphTotalAmount({ target: targets.count }));
      }
    },
  });

  const rows = useMemo(() => {
    const targets: Target[] = [];
    if (loading) {
      for (let i = currentLoadList.length; i < currentLoadAmount; ++i) {
        targets.push({});
      }
    } else {
      for (let i = 0; i < currentLoadList.length; ++i) {
        targets.push(currentLoadList[i]);
      }
      for (let i = currentLoadList.length; i < currentLoadAmount; ++i) {
        targets.push({});
      }
    }

    return targets.map((target, idx) => (
      <TableRow
        key={`load-table-row-${idx}`}
        rowContent={[target.name ?? "-", target.oven ?? "-", dateToDisplayString(target.createdAt, true)]}
        selected={target.id === targetId}
        id={target.id ?? 0}
        disabled={target.id === undefined}
        handleSelect={() => handleSelectRow(target.id ?? 0)}
      />
    ));
  }, [currentLoadList, currentLoadAmount, handleSelectRow, targetId, loading]);

  if (error) return <NotFound />;

  return (
    <LoadTable>
      <TableHeader columnNames={["Nom", "Four", "Créé le"]} />
      <tbody>{rows}</tbody>
    </LoadTable>
  );
};

export default TargetLoadTable;
