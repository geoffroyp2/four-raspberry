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
    data: [...points].map((e) => ({ x: e.time || 0, y: e.temperature || 0 })).sort((a, b) => a.x - b.x),
    borderColor: `rgba(${color.r},${color.g},${color.b},${color.a})`, // couleur de la courbe
  });
  dataSets.push({
    ...dataSetOptions,
    label: "Température",
    data: [...points].map((e) => ({ x: e.time || 0, y: e.oxygen || 0 })).sort((a, b) => a.x - b.x),
    borderColor: `rgba(180,180,180,0.9)`, // couleur de la courbe
  });

  return dataSets;
};
