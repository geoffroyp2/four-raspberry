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
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 ">
      <div className="bg-gray-900 p-2 pt-3 rounded-lg shadow-lg ">
        <Scatter
          type="scatter"
          data={{
            datasets: [...dataSets],
          }}
          options={simpleGraphOptions}
        />
      </div>
    </div>
  );
};

export default SimpleGraph;
