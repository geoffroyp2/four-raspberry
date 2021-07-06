import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRecordNameSearch, setRecordNameSearch } from "../_state/recordDataSlice";

import TableSearch from "@components/tables/TableSearch";

const RecordSearchField: FC = () => {
  const dispatch = useDispatch();
  const nameSearch = useSelector(selectRecordNameSearch);

  const submitSearch = useCallback(
    (fieldValue: string) => {
      dispatch(setRecordNameSearch(fieldValue === "" ? null : fieldValue));
    },
    [dispatch]
  );

  return <TableSearch handleSubmit={submitSearch} initialValue={nameSearch ?? ""} placeholder={"Nom de la courbe"} />;
};

export default RecordSearchField;
