import React, { useEffect, useState } from "react";

import { Scatter } from "react-chartjs-2";
import "chartjs-plugin-crosshair";

import { Color, Point } from "../interfaces/programInterfaces";
import { formatTime } from "../utils/timeFormatter";
import program from "../program-logic/program";

interface Props {
  name: string;
  points: Point[];
  color: Color;
}

const refreshRate = 1000;

const ProgramGraph = ({ name, points, color }: Props) => {
  const [currentTempRecord, setCurrentTempRecord] = useState([
    ...program.currentTempRecord,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTempRecord([...program.currentTempRecord]);
    }, refreshRate);
    return () => clearTimeout(timer);
  });

  return (
    <Scatter
      data={{
        datasets: [
          {
            label: "Température cible",
            data: points,
            showLine: true,
            fill: false,

            backgroundColor: "rgb(0, 0, 0)", // couleur de remplissage de la courbe
            borderColor: `rgba(${color.r},${color.g},${color.b},${color.a})`, // couleur de la courbe

            pointBackgroundColor: "rgba(0, 0, 0, 0)", // portion centrale des points
            pointBorderColor: "rgba(0, 0, 0, 0)", // bordure des points
            pointBorderWidth: 0, // épaisseur de la bordure
            pointHitRadius: 0, // rayon de hover
            pointHoverBackgroundColor: "rgba(0, 0, 0, 0)", // transformations de hover
            pointHoverBorderColor: "rgba(0, 0, 0, 0)",
            pointHoverBorderWidth: 0,

            lineTension: 0.3,
            yAxisID: "temp",
          },
          {
            label: "Température mesurée",
            data: currentTempRecord,
            showLine: true,
            fill: false,

            backgroundColor: "rgb(0, 0, 0)", // couleur de remplissage de la courbe
            borderColor: `rgba(255, 0, 0, 1)`, // couleur de la courbe

            pointBackgroundColor: "rgba(0, 0, 0, 0)", // portion centrale des points
            pointBorderColor: "rgba(0, 0, 0, 0)", // bordure des points
            pointBorderWidth: 0, // épaisseur de la bordure
            pointHitRadius: 0, // rayon de hover
            pointHoverBackgroundColor: "rgba(0, 0, 0, 0)", // transformations de hover
            pointHoverBorderColor: "rgba(0, 0, 0, 0)",
            pointHoverBorderWidth: 0,

            lineTension: 0.3,
            yAxisID: "temp",
          },
        ],
      }}
      options={{
        // Set animation time to 0 (better performances)
        responsiveAnimationDuration: 0, // resize animation
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },

        // axes
        scales: {
          yAxes: [
            {
              type: "linear",
              id: "temp",
              position: "left",
              ticks: {
                min: 0,
                max: 2650,
              },
            },
          ],
          xAxes: [
            {
              type: "linear",
              ticks: {
                stepSize: 1000 * 60 * 60, // 1 par heure
                callback: (val: string) => {
                  return formatTime(val); // formatage du texte
                },
              },
              position: "bottom",
            },
          ],
        },

        // Plugins

        tooltips: {
          mode: "interpolate",
          intersect: false,
        },

        plugins: {
          crosshair: {
            line: {
              color: "rgba(255,80,80,0.8)", // crosshair line color
              width: 2, // crosshair line width
              //   dashPattern: [5,3],
            },
            zoom: {
              enabled: true, // enable zooming
              zoomboxBackgroundColor: "rgba(66,133,244,0.2)", // background color of zoom box
              zoomboxBorderColor: "#48F", // border color of zoom box
              zoomButtonText: "Reset Zoom", // reset zoom button text
              zoomButtonClass: "reset-zoom", // reset zoom button class
            },
          },
        },
      }}
    />
  );
};

export default ProgramGraph;
