import React from "react";
import { Scatter } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectedGraph } from "../../../redux/reducers/graphs/graphSlice";
import { formatTime } from "../../../utils/timeFormatting";

const SimpleGraph = () => {
  const graph = useSelector(selectedGraph);

  return (
    <Scatter
      data={{
        datasets: [
          {
            label: "Température cible",
            data: [...graph.points],
            showLine: true,
            fill: false,

            backgroundColor: "rgb(0, 0, 0)", // couleur de remplissage de la courbe
            borderColor: `rgba(${graph.color.r},${graph.color.g},${graph.color.b},${graph.color.a})`, // couleur de la courbe
            pointRadius: 2,
            pointBorderWidth: 0, // épaisseur de la bordure
            pointHitRadius: 10, // rayon de hover
            pointHoverBorderWidth: 0,

            lineTension: 0.3,
            yAxisID: "temp",
          },
        ],
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
                max: 1500,
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

export default SimpleGraph;
