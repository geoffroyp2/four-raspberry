import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPieceNameSearch, setPieceNameSearch } from "../_state/pieceDataSlice";

import TableSearch from "@components/tables/TableSearch";

const PieceSearchField: FC = () => {
  const dispatch = useDispatch();
  const nameSearch = useSelector(selectPieceNameSearch);

  const submitSearch = useCallback(
    (fieldValue: string) => {
      dispatch(setPieceNameSearch(fieldValue === "" ? null : fieldValue));
    },
    [dispatch]
  );

  return <TableSearch handleSubmit={submitSearch} initialValue={nameSearch ?? ""} placeholder={"Nom de la potterie"} />;
};

export default PieceSearchField;
