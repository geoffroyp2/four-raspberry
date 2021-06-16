import { FC } from "react";
import { useSelector } from "react-redux";

import SimpleGraph from "@components/graphs/SimpleGraph";
import { selectRecordPoints, selectRecordTargetPoints, selectRecordTempValues } from "../_state/recordDataSlice";

const RecordGraph: FC = () => {
  const recordPoints = useSelector(selectRecordPoints);
  const targetpoints = useSelector(selectRecordTargetPoints);

  const { color } = useSelector(selectRecordTempValues);

  return <SimpleGraph recordPoints={recordPoints} targetPoints={targetpoints} color={color} />;
};

export default RecordGraph;
