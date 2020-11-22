import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Graph } from "../../../interfaces/Igraph";

import program from "../../../programLogic/program";
import { formatTime } from "../../../utils/timeFormatter";

type Props = {
  id: string;
};

const SimpleGraph = ({ id }: Props) => {
  const [p, setP] = useState<Graph>({ ...program.graphs[id] });
  useEffect(() => {
    if (!program.UIRefresh["programGraphPreview"])
      program.UIRefresh["programGraphPreview"] = () => {
        setP({ ...program.graphs[id] });
      };
    return () => {
      delete program.UIRefresh["programGraphPreview"];
    };
  }, [id]);

  return (
    <Scatter
      data={{
        datasets: [
          {
            label: "Température cible",
            data: p.points,
            showLine: true,
            fill: false,

            backgroundColor: "rgb(0, 0, 0)", // couleur de remplissage de la courbe
            borderColor: `rgba(${p.color.r},${p.color.g},${p.color.b},${p.color.a})`, // couleur de la courbe
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
