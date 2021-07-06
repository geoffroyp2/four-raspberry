import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGraphRoute, setGraphRoute } from "../_state/graphDisplaySlice";

import RecordSearchField from "./RecordSearchField";
import TargetSearchField from "./TargetSearchField";
import TableTitle, { TableTitleTab } from "@components/tables/TableTitle";

const RecordTableTitle: FC = () => {
  const dispatch = useDispatch();
  const graphRoute = useSelector(selectGraphRoute);

  return (
    <TableTitle
      tabs={[
        <TableTitleTab
          key="title-tab-target"
          title="Courbes de Référence"
          onClick={() => dispatch(setGraphRoute("targets"))}
          selected={graphRoute === "targets"}
        />,
        <TableTitleTab
          key="title-tab-record"
          title="Courbes de Cuisson"
          onClick={() => dispatch(setGraphRoute("records"))}
          selected={graphRoute === "records"}
        />,
      ]}
      searchField={graphRoute === "targets" ? <TargetSearchField /> : <RecordSearchField />}
    />
  );
};

export default RecordTableTitle;
