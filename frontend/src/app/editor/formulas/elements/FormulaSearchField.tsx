import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFormulaNameSearch, setFormulaNameSearch } from "../_state/formulaDisplaySlice";

import TableSearch from "@components/tables/TableSearch";

const FormulaSearchField: FC = () => {
  const dispatch = useDispatch();
  const nameSearch = useSelector(selectFormulaNameSearch);

  const submitSearch = useCallback(
    (fieldValue: string) => {
      dispatch(setFormulaNameSearch(fieldValue === "" ? null : fieldValue));
    },
    [dispatch]
  );

  return <TableSearch handleSubmit={submitSearch} initialValue={nameSearch ?? ""} placeholder={"Nom de l'émail"} />;
};

export default FormulaSearchField;
