import { Color, RecordPoint, TargetPoint } from "@baseTypes/database/GQLResTypes";

export const buildDataPoints = (
  points: RecordPoint[] | TargetPoint[],
  color: Color,
  dataSetOptions: Chart.ChartDataSets
) => {
  const dataSets: Chart.ChartDataSets[] = [];

  dataSets.push({
    ...dataSetOptions,
    label: "Température",
    yAxisID: "temp",
    data: points.map((e) => ({ x: e.time || 0, y: e.temperature?.toFixed(0) || 0 })),
    borderColor: `rgba(${color.r},${color.g},${color.b},${color.a})`, // couleur de la courbe
  });
  dataSets.push({
    ...dataSetOptions,
    label: "Oxygène",
    yAxisID: "oxy",
    data: points.map((e) => ({ x: e.time || 0, y: e.oxygen?.toFixed(2) || 0 })),
    borderColor: `rgba(180,180,180,0.9)`, // couleur de la courbe
  });

  return dataSets;
};
