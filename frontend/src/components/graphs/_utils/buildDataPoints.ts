import { Color, RecordPoint, TargetPoint } from "@app/_types/dbTypes";
import { simpleGraphDataSetOptions } from "./simpleGraphOptions";

/**
 * Typescript not yet supported
 */

export const buildDataPoints = (
  recordPoints: RecordPoint[] | undefined,
  targetPoints: TargetPoint[] | undefined,
  color: Color
) => {
  const dataSets: any[] = [];

  if (recordPoints) {
    dataSets.push({
      ...simpleGraphDataSetOptions,
      label: "Température",
      yAxisID: "temp",
      data: recordPoints.map((e) => ({ x: e.time || 0, y: e.temperature?.toFixed(0) || 0 })),
      borderColor: `rgba(${color.r},${color.g},${color.b},${color.a})`, // couleur de la courbe
    });
    dataSets.push({
      ...simpleGraphDataSetOptions,
      label: "Oxygène",
      yAxisID: "oxy",
      data: recordPoints.map((e) => ({ x: e.time || 0, y: e.oxygen?.toFixed(2) || 0 })),
      borderColor: `rgba(180,180,220,0.9)`, // couleur de la courbe
      fill: "start",
      backgroundColor: `rgba(180,180,220,0.1)`,
    });
    if (targetPoints) {
      dataSets.push({
        ...simpleGraphDataSetOptions,
        label: "Température cible",
        yAxisID: "temp",
        data: targetPoints.map((e) => ({ x: e.time || 0, y: e.temperature?.toFixed(0) || 0 })),
        borderColor: `rgba(230,230,230,0.8)`, // couleur de la courbe
      });
    }
  } else if (targetPoints) {
    dataSets.push({
      ...simpleGraphDataSetOptions,
      label: "Température",
      yAxisID: "temp",
      data: targetPoints.map((e) => ({ x: e.time || 0, y: e.temperature?.toFixed(0) || 0 })),
      borderColor: `rgba(${color.r},${color.g},${color.b},${color.a})`, // couleur de la courbe
    });
    dataSets.push({
      ...simpleGraphDataSetOptions,
      label: "Oxygène",
      yAxisID: "oxy",
      data: targetPoints.map((e) => ({ x: e.time || 0, y: e.oxygen?.toFixed(2) || 0 })),
      borderColor: `rgba(180,180,220,0.9)`, // couleur de la courbe
      fill: "start",
      backgroundColor: `rgba(180,180,220,0.1)`,
    });
  }

  return dataSets;
};
