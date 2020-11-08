import React from "react";
import { Scatter } from "react-chartjs-2";
import { Graph } from "../interfaces/programInterfaces";
import { formatTime } from "../utils/timeFormatter";
import "chartjs-plugin-crosshair";

interface Props {
  name: string;
  graph: Graph;
}

const ProgramGraph = ({ name, graph }: Props) => {
  return (
    <Scatter
      data={{
        datasets: [
          {
            label: name,
            data: graph.points,
            showLine: true,
            fill: false,

            backgroundColor: "rgb(0, 0, 0)", // couleur de remplissage de la courbe
            borderColor: `rgba(${graph.color.r},${graph.color.g},${graph.color.b},${graph.color.a})`, // couleur de la courbe

            pointBackgroundColor: "rgba(0, 0, 0, 0.5)", // portion centrale des points
            pointBorderColor: "rgba(0, 0, 0, 0.1)", // bordure des points
            pointBorderWidth: 2, // épaisseur de la bordure
            pointHitRadius: 0, // rayon de hover
            pointHoverBackgroundColor: "rgba(0, 0, 0, 0)", // transformations de hover
            pointHoverBorderColor: "rgba(0, 0, 0,0)",
            pointHoverBorderWidth: 2,

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
