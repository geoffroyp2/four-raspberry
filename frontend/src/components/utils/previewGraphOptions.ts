import { graphFormatTime } from "@utils/timeFormat";

export const previewGraphDataSetOptions: Chart.ChartDataSets = {
  showLine: true,
  fill: false,
  backgroundColor: "rgb(0, 0, 0)", // couleur de remplissage de la courbe
  pointRadius: 2,
  pointBorderWidth: 0, // épaisseur de la bordure
  pointHitRadius: 10, // rayon de hover
  pointHoverBorderWidth: 0,
  lineTension: 0.3,
};

export const previewGraphOptions: Chart.ChartOptions = {
  responsiveAnimationDuration: 100, // resize delay
  animation: { duration: 200 },
  hover: { animationDuration: 100 },
  legend: { display: true, position: "bottom", labels: { fontColor: "rgba(230,230,230,1)", fontStyle: "thin" } },

  tooltips: {
    displayColors: false,
    callbacks: {
      label: (item: Chart.ChartTooltipItem) => {
        switch (item.datasetIndex) {
          case 0:
            return `${graphFormatTime(item.label!, true)}  ${item.value}°C`; // temperature
          case 1:
            return `${graphFormatTime(item.label!, true)}  ${item.value}`; // oxygène
          default:
            return `${graphFormatTime(item.label!, true)}  ${item.value}`; // oxygène
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
          color: "rgba(160,160,160,0.7)",
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
          color: "rgba(120,110,110,0.4)",
          zeroLineColor: "rgba(120,110,110,0.4)",
          lineWidth: 0.5,
          borderDash: [12, 12],
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
        gridLines: {
          color: "rgba(90,90,90,0.4)",
          lineWidth: 0.5,
        },
        position: "bottom",
      },
    ],
  },
};
