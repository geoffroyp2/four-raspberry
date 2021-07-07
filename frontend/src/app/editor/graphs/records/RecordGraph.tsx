import { FC } from "react";

import { useSelector } from "react-redux";
import { selectRecordColor, selectRecordPoints, selectRecordTargetPoints } from "../_state/recordDataSlice";

import NotFound from "@editor/NotFound";
import SimpleGraph from "@components/graphs/SimpleGraph";
import useRecordLoadPoints from "../hooks/useRecordLoadPoints";

const RecordGraph: FC = () => {
  const color = useSelector(selectRecordColor);
  const recordPoints = useSelector(selectRecordPoints);
  const targetpoints = useSelector(selectRecordTargetPoints);
  const { loading, error, called } = useRecordLoadPoints();

  if (error) return <NotFound />;
  if (!called || loading) return <div className="w-full"></div>;

  console.log("Rendering RecordGraph");

  return <SimpleGraph recordPoints={recordPoints} targetPoints={targetpoints} color={color} />;
};

export default RecordGraph;
