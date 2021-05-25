import { FC } from "react";
import { Scatter } from "react-chartjs-2";

import { Color, RecordPoint, TargetPoint } from "@app/_types/dbTypes";
import { buildDataPoints } from "./_utils/buildDataPoints";
import { simpleGraphOptions } from "./_utils/simpleGraphOptions";

type Props = {
  recordPoints?: RecordPoint[];
  targetPoints?: TargetPoint[];
  color: Color | undefined;
};

const defaultColor: Color = { r: 230, g: 230, b: 230, a: 1 };

const SimpleGraph: FC<Props> = ({ recordPoints, targetPoints, color }) => {
  const dataSets = buildDataPoints(recordPoints, targetPoints, color || defaultColor);

  return (
    <div className="bg-gray-900 p-1 rounded-lg">
      <Scatter
        type="scatter"
        data={{
          datasets: [...dataSets],
        }}
        options={simpleGraphOptions}
      />
    </div>
  );
};

export default SimpleGraph;
