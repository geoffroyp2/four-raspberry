import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTargetNameSearch, setTargetNameSearch } from "../_state/targetDataSlice";

import TableSearch from "@components/tables/TableSearch";

const TargetSearchField: FC = () => {
  const dispatch = useDispatch();
  const nameSearch = useSelector(selectTargetNameSearch);

  const submitSearch = useCallback(
    (fieldValue: string) => {
      dispatch(setTargetNameSearch(fieldValue === "" ? null : fieldValue));
    },
    [dispatch]
  );

  return <TableSearch handleSubmit={submitSearch} initialValue={nameSearch ?? ""} placeholder={"Nom de la courbe"} />;
};

export default TargetSearchField;
