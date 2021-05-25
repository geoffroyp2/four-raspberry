import { useSelector } from "react-redux";

import SimpleGraph from "@components/graphs/SimpleGraph";
import { selectRecordPoints, selectRecordTargetPoints, selectRecordTempValues } from "../_state/recordDataSlice";

const RecordGraph = () => {
  const recordPoints = useSelector(selectRecordPoints);
  const targetpoints = useSelector(selectRecordTargetPoints);

  const { color } = useSelector(selectRecordTempValues);

  return (
    <div className="flex flex-col xl:flex-row">
      <SimpleGraph recordPoints={recordPoints} targetPoints={targetpoints} color={color} />
      <div>INFOS</div>
    </div>
  );
};

export default RecordGraph;
