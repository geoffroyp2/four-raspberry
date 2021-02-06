import React, { FC } from "react";
import { Scatter } from "react-chartjs-2";

import { RootState } from "@store/store";
import { Color, RecordPoint, TargetPoint } from "@baseTypes/database/GQLResTypes";
import { useSelector } from "react-redux";
import { buildDataPoints } from "./utils/buildDataPoints";
import { graphFormatTime } from "@utils/timeFormat";

type Props = {
  points: (state: RootState) => RecordPoint[] | TargetPoint[];
  color: Color | undefined;
};

const dataSetOptions: Chart.ChartDataSets = {
  showLine: true,
  fill: false,
  backgroundColor: "rgb(0, 0, 0)", // couleur de remplissage de la courbe
  pointRadius: 2,
  pointBorderWidth: 0, // épaisseur de la bordure
  pointHitRadius: 10, // rayon de hover
  pointHoverBorderWidth: 0,
  lineTension: 0.3,
  yAxisID: "temp",
};

const defaultColor: Color = { r: 230, g: 230, b: 230, a: 1 };

const PreviewGraph: FC<Props> = ({ points, color }) => {
  const currentPoints = useSelector(points);

  const dataSets = buildDataPoints(currentPoints, color || defaultColor, dataSetOptions);

  return (
    <Scatter
      data={{
        datasets: [...dataSets],
      }}
      options={{
        responsiveAnimationDuration: 0, // resize animation
        animation: { duration: 0 },
        hover: { animationDuration: 0 },
        legend: { display: false },

        tooltips: {
          displayColors: false,
          callbacks: {
            label: (item: any) => {
              return `${graphFormatTime(item.label, true)} - ${item.value}°C`;
            },
          },
        },

        // axes
        scales: {
          yAxes: [
            {
              type: "linear",
              id: "temp",
              position: "left",
              ticks: {
                fontColor: "rgb(190,190,190)",
                callback: (val: string) => {
                  return +val > 0 ? val : "";
                },
                stepSize: 300,
                min: 0,
              },
            },
          ],
          xAxes: [
            {
              type: "linear",
              ticks: {
                fontColor: "rgb(190,190,190)",
                stepSize: 1000 * 60 * 60, // 1 par heure
                callback: (val: string) => {
                  return graphFormatTime(val, false); // formatage du texte
                },
              },
              position: "bottom",
            },
          ],
        },
      }}
    />
  );
};

export default PreviewGraph;

/*import React from "react";
import { Scatter } from "react-chartjs-2";

import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";

import { Color, Point } from "@sharedTypes/dbModelTypes";
import { graphFormatTime } from "@UIutils/timeFormat";

const dataSetOptions = {
  showLine: true,
  fill: false,
  backgroundColor: "rgb(0, 0, 0)", // couleur de remplissage de la courbe
  pointRadius: 2,
  pointBorderWidth: 0, // épaisseur de la bordure
  pointHitRadius: 10, // rayon de hover
  pointHoverBorderWidth: 0,
  lineTension: 0.3,
  yAxisID: "temp",
};

type Props = {
  pointsSelector: (state: RootState) => Point[];
  colorSelector: (state: RootState) => Color;
  refPoints: Point[] | null;
};

const SimpleGraph = ({ pointsSelector, colorSelector, refPoints }: Props) => {
  const points = useSelector(pointsSelector);
  const color = useSelector(colorSelector);

  const dataSets = [
    {
      ...dataSetOptions,
      label: "Température",
      data: [...points].sort((a, b) => a.x - b.x),
      borderColor: `rgba(${color.r},${color.g},${color.b},${color.a})`, // couleur de la courbe
    },
  ];

  if (refPoints)
    dataSets.push({
      ...dataSetOptions,
      data: [...refPoints].sort((a, b) => a.x - b.x),
      label: "Température de référence",
      borderColor: `rgba(210,210,210,0.9)`, // courbe de référence toujours blanche ?
    });

  return (
    <Scatter
      data={{
        datasets: [...dataSets],
      }}
      options={{
        responsiveAnimationDuration: 0, // resize animation
        animation: { duration: 0 },
        hover: { animationDuration: 0 },
        legend: { display: false },

        tooltips: {
          displayColors: false,
          callbacks: {
            label: (item: any) => {
              return `${graphFormatTime(item.label, true)} - ${item.value}°C`;
            },
          },
        },

        // axes
        scales: {
          yAxes: [
            {
              type: "linear",
              id: "temp",
              position: "left",
              ticks: {
                fontColor: "rgb(190,190,190)",
                callback: (val: string) => {
                  return +val > 0 ? val : "";
                },
                stepSize: 300,
                min: 0,
              },
            },
          ],
          xAxes: [
            {
              type: "linear",
              ticks: {
                fontColor: "rgb(190,190,190)",
                stepSize: 1000 * 60 * 60, // 1 par heure
                callback: (val: string) => {
                  return graphFormatTime(val, false); // formatage du texte
                },
              },
              position: "bottom",
            },
          ],
        },
      }}
    />
  );
};

export default SimpleGraph;

*/
