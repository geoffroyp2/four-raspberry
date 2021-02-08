import React, { FC } from "react";
import { Scatter } from "react-chartjs-2";

import { RootState } from "@store/store";
import { Color, RecordPoint, TargetPoint } from "@baseTypes/database/GQLResTypes";
import { useSelector } from "react-redux";
import { buildDataPoints } from "./utils/buildDataPoints";
import { graphFormatTime } from "@utils/timeFormat";

import "./styles/graph.scss";

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
        legend: { display: true, position: "bottom" },

        tooltips: {
          displayColors: false,
          callbacks: {
            label: (item: any) => {
              switch (item.datasetIndex) {
                case 0:
                  return `${graphFormatTime(item.label, true)}  ${item.value}°C`; // temperature
                case 1:
                  return `${graphFormatTime(item.label, true)}  ${item.value}`; // oxygène
                default:
                  return `${graphFormatTime(item.label, true)}  ${item.value}`; // oxygène
              }
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
              gridLines: {
                color: "rgba(140,140,140,0.7)",
              },
            },
            {
              type: "linear",
              id: "oxy",
              position: "right",
              ticks: {
                fontColor: "rgb(190,190,190)",
                callback: (val: string) => {
                  return +val > 0 ? val : "";
                },
                stepSize: 0.2,
                min: -0.1,
                max: 1.1,
              },
              gridLines: {
                color: "rgba(10,10,10,0.4)",
              },
            },
          ],
          xAxes: [
            {
              type: "linear",
              ticks: {
                fontColor: "rgb(190,190,190)",
                stepSize: 60 * 60, // 1 par heure
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
