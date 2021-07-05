import React, { FC } from "react";
import { Scatter } from "react-chartjs-2";
import "./styles/graph.scss";

import { Color, RecordPoint, TargetPoint } from "@baseTypes/database/GQLResTypes";
import { buildDataPoints } from "./utils/buildDataPoints";
import { previewGraphOptions } from "./utils/previewGraphOptions";

type Props = {
  recordPoints?: RecordPoint[];
  targetPoints?: TargetPoint[];
  color: Color | undefined;
};

const defaultColor: Color = { r: 230, g: 230, b: 230, a: 1 };

const PreviewGraph: FC<Props> = ({ recordPoints, targetPoints, color }) => {
  const dataSets = buildDataPoints(recordPoints, targetPoints, color || defaultColor);

  return (
    <Scatter
      data={{
        datasets: [...dataSets],
      }}
      options={previewGraphOptions}
    />
  );
};

export default PreviewGraph;
