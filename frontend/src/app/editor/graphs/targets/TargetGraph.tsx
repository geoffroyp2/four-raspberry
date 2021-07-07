import { FC } from "react";

import { useSelector } from "react-redux";
import { selectTargetTempPoints, selectTargetColor } from "../_state/targetDataSlice";

import NotFound from "@editor/NotFound";
import SimpleGraph from "@components/graphs/SimpleGraph";
import useTargetLoadPoints from "../hooks/useTargetLoadPoints";

const TargetGraph: FC = () => {
  const targetPoints = useSelector(selectTargetTempPoints);
  const color = useSelector(selectTargetColor);
  const { loading, error, called } = useTargetLoadPoints();

  if (error) return <NotFound />;
  if (!called || loading) return <div className="w-full"></div>;

  return (
    <SimpleGraph
      targetPoints={[...targetPoints].sort((a, b) => {
        if (a.time === undefined || a.temperature === undefined || b.time === undefined || b.temperature === undefined) return 1;
        if (a.time === b.time) return a.temperature - b.temperature;
        return a.time - b.time;
      })}
      color={color}
    />
  );
};

export default TargetGraph;
