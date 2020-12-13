import React from "react";
import { Scatter } from "react-chartjs-2";

import { useSelector } from "react-redux";

import { formatTime } from "@UIutils/timeFormatting";
import { runGraph, targetGraph } from "@redux/+old/engineStatusSlice";

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

const CompleteGraph = () => {
  const recGraph = useSelector(runGraph);
  const refGraph = useSelector(targetGraph);

  const dataSets = [
    {
      ...dataSetOptions,
      label: "Température",
      data: [...recGraph.points].sort((a, b) => a.x - b.x),
      borderColor: `rgba(${recGraph.color.r},${recGraph.color.g},${recGraph.color.b},${recGraph.color.a})`, // couleur de la courbe
    },
  ];

  if (refGraph)
    dataSets.push({
      ...dataSetOptions,
      data: [...refGraph.points].sort((a, b) => a.x - b.x),
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
              return `${formatTime(item.label, true)} - ${item.value}°C`;
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
                  return formatTime(val, false); // formatage du texte
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

export default CompleteGraph;
